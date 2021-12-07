// @flow
import min from 'lodash/min';
import map from 'lodash/map';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import XDate from 'xdate';

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions, ScrollView, TextStyle, ViewStyle} from 'react-native';

import {Theme} from '../types';
import styleConstructor from './style';
import populateEvents from './Packer';


const LEFT_MARGIN = 60 - 1;
const TEXT_LINE_HEIGHT = 17;

function range(from: number, to: number) {
  return Array.from(Array(to), (_, i) => from + i);
}

let {width: dimensionWidth} = Dimensions.get('window');

export type Event = {
  start: string;
  end: string;
  title: string;
  summary: string;
  color?: string;
};

export interface TimelineProps {
  events: Event[];
  start?: number;
  end?: number;
  eventTapped?: (event: Event) => void; //TODO: deprecate (prop renamed 'onEventPress', as in the other components).
  onEventPress?: (event: Event) => void;
  styles?: Theme; //TODO: deprecate (prop renamed 'theme', as in the other components).
  theme?: Theme;
  scrollToFirst?: boolean;
  format24h?: boolean;
  renderEvent?: (event: Event) => JSX.Element;
}

interface State {
  _scrollY: number;
  packedEvents: Event[];
}

export default class Timeline extends Component<TimelineProps, State> {
  static propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    eventTapped: PropTypes.func, // TODO: remove after deprecation
    onEventPress: PropTypes.func,
    format24h: PropTypes.bool,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        color: PropTypes.string
      })
    ).isRequired
  };

  static defaultProps = {
    start: 0,
    end: 24,
    events: [],
    format24h: true
  };

  private scrollView: React.RefObject<any> = React.createRef();
  style: {[key: string]: ViewStyle | TextStyle};
  calendarHeight: number;

  constructor(props: TimelineProps) {
    super(props);

    const {start = 0, end = 0} = this.props;
    this.calendarHeight = (end - start) * 100;

    this.style = styleConstructor(props.theme || props.styles, this.calendarHeight);

    const width = dimensionWidth - LEFT_MARGIN;
    const packedEvents = populateEvents(props.events, width, start);
    let initPosition = min(map(packedEvents, 'top')) - this.calendarHeight / (end - start);
    const verifiedInitPosition = initPosition < 0 ? 0 : initPosition;

    this.state = {
      _scrollY: verifiedInitPosition,
      packedEvents
    };
  }

  componentDidUpdate(prevProps: TimelineProps) {
    const width = dimensionWidth - LEFT_MARGIN;
    const {events: prevEvents, start: prevStart = 0} = prevProps;
    const {events, start = 0} = this.props;

    if (prevEvents !== events || prevStart !== start) {
      this.setState({
        packedEvents: populateEvents(events, width, start)
      });
    }
  }

  componentDidMount() {
    this.props.scrollToFirst && this.scrollToFirst();
  }

  scrollToFirst() {
    setTimeout(() => {
      if (this.state && this.state._scrollY && this.scrollView) {
        this.scrollView?.current?.scrollTo({
          x: 0,
          y: this.state._scrollY,
          animated: true
        });
      }
    }, 1);
  }

  _renderLines() {
    const {format24h, start = 0, end = 24} = this.props;
    const offset = this.calendarHeight / (end - start);
    const EVENT_DIFF = 20;

    return range(start, end + 1).map((i, index) => {
      let timeText;

      if (i === start) {
        timeText = '';
      } else if (i < 12) {
        timeText = !format24h ? `${i} AM` : `${i}:00`;
      } else if (i === 12) {
        timeText = !format24h ? `${i} PM` : `${i}:00`;
      } else if (i === 24) {
        timeText = !format24h ? '12 AM' : '23:59';
      } else {
        timeText = !format24h ? `${i - 12} PM` : `${i}:00`;
      }

      return [
        <Text key={`timeLabel${i}`} style={[this.style.timeLabel, {top: offset * index - 6}]}>
          {timeText}
        </Text>,
        i === start ? null : (
          <View key={`line${i}`} style={[this.style.line, {top: offset * index, width: dimensionWidth - EVENT_DIFF}]} />
        ),
        <View
          key={`lineHalf${i}`}
          style={[this.style.line, {top: offset * (index + 0.5), width: dimensionWidth - EVENT_DIFF}]}
        />
      ];
    });
  }

  _onEventPress(event: Event) {
    if (this.props.eventTapped) { //TODO: remove after deprecation
      this.props.eventTapped(event);
    } else {
      invoke(this.props, 'onEventPress', event);
    }
  }

  _renderEvents() {
    const {packedEvents} = this.state;
    let events = packedEvents.map((event: any, i: number) => {
      const style = {
        left: event.left,
        height: event.height,
        width: event.width,
        top: event.top,
        backgroundColor: event.color ? event.color : '#add8e6'
      };

      // Fixing the number of lines for the event title makes this calculation easier.
      // However it would make sense to overflow the title to a new line if needed
      const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);
      const formatTime = this.props.format24h ? 'HH:mm' : 'hh:mm A';

      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this._onEventPress(this.props.events[event.index])}
          key={i}
          style={[this.style.event, style]}
        >
          {this.props.renderEvent ? (
            this.props.renderEvent(event)
          ) : (
            <View>
              <Text numberOfLines={1} style={this.style.eventTitle}>
                {event.title || 'Event'}
              </Text>
              {numberOfLines > 1 ? (
                <Text numberOfLines={numberOfLines - 1} style={[this.style.eventSummary]}>
                  {event.summary || ' '}
                </Text>
              ) : null}
              {numberOfLines > 2 ? (
                <Text style={this.style.eventTimes} numberOfLines={1}>
                  {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
                </Text>
              ) : null}
            </View>
          )}
        </TouchableOpacity>
      );
    });

    return (
      <View>
        <View style={{marginLeft: LEFT_MARGIN}}>{events}</View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView
        ref={this.scrollView}
        contentContainerStyle={[this.style.contentStyle, {width: dimensionWidth}]}
      >
        {this._renderLines()}
        {this._renderEvents()}
      </ScrollView>
    );
  }
}
