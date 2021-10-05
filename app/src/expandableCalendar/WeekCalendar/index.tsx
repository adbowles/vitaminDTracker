import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import XDate from 'xdate';
import {Map} from 'immutable';

import React, {Component} from 'react';
import {FlatList, View, Text, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';

// @ts-expect-error
import {extractComponentProps} from '../../component-updater';
// @ts-expect-error
import {weekDayNames} from '../../dateutils';
// @ts-expect-error
import {toMarkingFormat} from '../../interface';
import {DateData} from '../../types';
import styleConstructor from '../style';
import asCalendarConsumer from '../asCalendarConsumer';
import CalendarList, {CalendarListProps} from '../../calendar-list';
import Week from '../week';
import Presenter from './presenter';


const commons = require('../commons');
const NUMBER_OF_PAGES = 2; // must be a positive number
const applyAndroidRtlFix = commons.isAndroid && commons.isRTL;

interface Props extends CalendarListProps {
  /** whether to have shadow/elevation for the calendar */
  allowShadow?: boolean;
  /** whether to hide the names of the week days */
  hideDayNames?: boolean;
  context?: any;
}
export type WeekCalendarProps = Props;

interface State {
  items: Date[]
}

/**
 * @description: Week calendar component
 * @note: Should be wrapped with 'CalendarProvider'
 * @example: https://github.com/wix/react-native-calendars/blob/master/example/src/screens/expandableCalendar.js
 */
class WeekCalendar extends Component<Props, State> {
  static displayName = 'WeekCalendar';

  static propTypes = {
    ...CalendarList.propTypes,
    /** the current date */
    current: PropTypes.any,
    /** whether to have shadow/elevation for the calendar */
    allowShadow: PropTypes.bool,
    /** whether to hide the names of the week days */
    hideDayNames: PropTypes.bool
  };

  static defaultProps = {
    firstDay: 0,
    allowShadow: true
  };

  style = styleConstructor(this.props.theme);
  presenter = new Presenter();
  page = NUMBER_OF_PAGES;
  // On Android+RTL there's an initial scroll that cause issues
  firstAndroidRTLScrollIgnored = !applyAndroidRtlFix;

  state: State = {
    items: this.presenter.getDatesArray(this.props)
  };

  componentDidUpdate(prevProps: Props) {
    const {context} = this.props;
    const {shouldComponentUpdate, getDatesArray, scrollToIndex} = this.presenter;

    if (shouldComponentUpdate(context, prevProps.context)) {
      this.setState({items: getDatesArray(this.props)});
      scrollToIndex(false);
    }
  }

  get containerWidth() {
    return this.props.calendarWidth || commons.screenWidth;
  }

  getDatesArray() {
    const array = [];
    for (let index = -NUMBER_OF_PAGES; index <= NUMBER_OF_PAGES; index++) {
      const d = this.getDate(index);
      array.push(d);
    }
    return array;
  }

  getDate(weekIndex: number) {
    const {current, context, firstDay = 0} = this.props;
    const d = new XDate(current || context.date);
    // get the first day of the week as date (for the on scroll mark)
    let dayOfTheWeek = d.getDay();
    if (dayOfTheWeek < firstDay && firstDay > 0) {
      dayOfTheWeek = 7 + dayOfTheWeek;
    }

    // leave the current date in the visible week as is
    const dd = weekIndex === 0 ? d : d.addDays(firstDay - dayOfTheWeek);
    const newDate = dd.addWeeks(weekIndex);
    return toMarkingFormat(newDate);
  }

  getWeekStyle = memoize((width, style) => {
    return [{width}, style];
  });

  onDayPress = (value: DateData) => {
    this.presenter.onDayPress(this.props.context, value);
  };

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    const {onScroll} = this.presenter;
    const {context} = this.props;
    const {items} = this.state;
    const {containerWidth, page} = this;

    const updateState = (newData: Date[], newPage: number) => {
      this.page = newPage;
      this.setState({items: [...newData]});
    };

    onScroll({context, updateState, x, page, items, width: containerWidth});
  };

  onMomentumScrollEnd = () => {
    const {items} = this.state;
    const {onMomentumScrollEnd} = this.presenter;

    const updateItems = (items: Date[]) => {
      setTimeout(() => {
        this.setState({items: [...items]});
      }, 100);
    };

    onMomentumScrollEnd({items, props: this.props, page: this.page, updateItems});
  };

  renderItem = ({item}: any) => {
    const {style, onDayPress, markedDates, firstDay, ...others} = extractComponentProps(Week, this.props);
    const {context} = this.props;

    const isSameWeek = this.presenter.isSameWeek(item, context.date, firstDay);
    const currentContext = isSameWeek ? context : undefined;

    return (
      <Week
        {...others}
        key={item}
        current={item}
        firstDay={firstDay}
        style={this.getWeekStyle(this.containerWidth, style)}
        markedDates={markedDates}
        onDayPress={onDayPress || this.onDayPress}
        context={currentContext}
      />
    );
  };

  getItemLayout = (_: any, index: number) => {
    return {
      length: this.containerWidth,
      offset: this.containerWidth * index,
      index
    };
  };

  keyExtractor = (_: Date, index: number) => index.toString();

  renderWeekDaysNames = memoize(weekDaysNames => {
    return weekDaysNames.map((day: Date, index: number) => (
      <Text
        allowFontScaling={false}
        key={index}
        style={this.style.dayHeader}
        numberOfLines={1}
        accessibilityLabel={''}
        // accessible={false} // not working
        // importantForAccessibility='no'
      >
        {day}
      </Text>
    ));
  });

  render() {
    const {allowShadow, firstDay, hideDayNames, current, context} = this.props;
    const {items} = this.state;
    const weekDaysNames = weekDayNames(firstDay);
    const extraData = Map({
      current,
      date: context.date,
      firstDay
    });

    return (
      <View
        testID={this.props.testID}
        style={[allowShadow && this.style.containerShadow, !hideDayNames && this.style.containerWrapper]}
      >
        {!hideDayNames && (
          <View style={[this.style.week, this.style.weekCalendar]}>
            {/* {this.props.weekNumbers && <Text allowFontScaling={false} style={this.style.dayHeader}></Text>} */}
            {this.renderWeekDaysNames(weekDaysNames)}
          </View>
        )}
        <FlatList
          ref={this.presenter.list}
          data={items}
          extraData={extraData}
          style={this.style.container}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          initialScrollIndex={NUMBER_OF_PAGES}
          getItemLayout={this.getItemLayout}
          onScroll={this.onScroll}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
        />
      </View>
    );
  }
}

export default asCalendarConsumer(WeekCalendar);
