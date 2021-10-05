import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import XDate from 'xdate';

import React, {Component} from 'react';
import {View, Text} from 'react-native';

// @ts-expect-error
import {xdateToData} from '../../interface';
// @ts-expect-error
import {isToday} from '../../dateutils';
// @ts-expect-error
import {RESERVATION_DATE} from '../../testIDs';
import styleConstructor from './style';
import {Theme} from '../../types';
import {DayReservations} from './index';


export interface ReservationProps {
  item: DayReservations;
  /** Specify theme properties to override specific styles for reservation parts. Default = {} */
  theme: Theme;
  /** specify your item comparison function for increased performance */
  rowHasChanged?: (a: any, b: any) => boolean;
  /** specify how each date should be rendered. day can be undefined if the item is not first in that day */
  renderDay?: (date: XDate, item?: DayReservations) => React.Component;
  /** specify how each item should be rendered in agenda */
  renderItem?: (reservation: any, isFirst: boolean) => React.Component;
  /** specify how empty date content with no items should be rendered */
  renderEmptyDate?: (date?: XDate) => React.Component;
}

class Reservation extends Component<ReservationProps> {
  static displayName = 'IGNORE';

  static propTypes = {
    item: PropTypes.any,
    /** Specify theme properties to override specific styles for reservation parts. Default = {} */
    theme: PropTypes.object,
    /** specify your item comparison function for increased performance */
    rowHasChanged: PropTypes.func,
    /** specify how each date should be rendered. day can be undefined if the item is not first in that day */
    renderDay: PropTypes.func,
    /** specify how each item should be rendered in agenda */
    renderItem: PropTypes.func,
    /** specify how empty date content with no items should be rendered */
    renderEmptyDate: PropTypes.func
  };

  style;

  constructor(props: ReservationProps) {
    super(props);
    this.style = styleConstructor(props.theme);
  }

  shouldComponentUpdate(nextProps: ReservationProps) {
    const r1 = this.props.item;
    const r2 = nextProps.item;
    let changed = true;

    if (!r1 && !r2) {
      changed = false;
    } else if (r1 && r2) {
      if (r1.day.getTime() !== r2.day.getTime()) {
        changed = true;
      } else if (!r1.reservation && !r2.reservation) {
        changed = false;
      } else if (r1.reservation && r2.reservation) {
        if ((!r1.date && !r2.date) || (r1.date && r2.date)) {
          if (isFunction(this.props.rowHasChanged)) {
            changed = this.props.rowHasChanged(r1.reservation, r2.reservation);
          }
        }
      }
    }
    return changed;
  }

  renderDate(date?: XDate, item?: DayReservations) {
    if (isFunction(this.props.renderDay)) {
      return this.props.renderDay(date ? xdateToData(date) : undefined, item);
    }

    const today = isToday(date) ? this.style.today : undefined;
    const dayNames = XDate.locales[XDate.defaultLocale].dayNamesShort;

    if (date) {
      return (
        <View style={this.style.day} testID={RESERVATION_DATE}>
          <Text allowFontScaling={false} style={[this.style.dayNum, today]}>
            {date.getDate()}
          </Text>
          <Text allowFontScaling={false} style={[this.style.dayText, today]}>
            {dayNames ? dayNames[date.getDay()] : undefined}
          </Text>
        </View>
      );
    } else {
      return <View style={this.style.day} />;
    }
  }

  render() {
    const {reservation, date} = this.props.item;
    let content;

    if (reservation) {
      const firstItem = date ? true : false;
      if (isFunction(this.props.renderItem)) {
        content = this.props.renderItem(reservation, firstItem);
      }
    } else if (isFunction(this.props.renderEmptyDate)) {
      content = this.props.renderEmptyDate(date);
    }

    return (
      <View style={this.style.container}>
        {this.renderDate(date, reservation)}
        <View style={this.style.innerContainer}>{content}</View>
      </View>
    );
  }
}

export default Reservation;
