import {ViewStyle, TextStyle} from 'react-native';
import {UpdateSources} from './expandableCalendar/commons';


export type Direction = 'left' | 'right';
export type UpdateSource = keyof typeof UpdateSources;
export type DateData = {
  year: number,
  month: number,
  day: number,
  timestamp: number,
  dateString: string
}
export type DayState = 'selected' | 'disabled' | 'inactive' | 'today' | '';

export interface Theme {
  container?: object;
  contentStyle?: ViewStyle;
  header?: object;
  headerText?: object;
  arrowButton?: object;
  event?: object;
  eventTitle?: object;
  eventSummary?: object;
  eventTimes?: object;
  line?: object;
  lineNow?: object;
  timeLabel?: object;
  todayTextColor?: string;
  calendarBackground?: string;
  indicatorColor?: string;
  stylesheet?: {
    calendar?: {main?: object, header?: object};
    day?: {basic?: object; period?: object};
    dot?: object;
    marking?: object;
    'calendar-list'?: {main?: object};
    agenda?: {main?: object, list?: object};
    expandable?: {main?: object}
  };
  textSectionTitleColor?: string;
  textSectionTitleDisabledColor?: string;
  dayTextColor?: string;
  selectedDayTextColor?: string;
  monthTextColor?: string;
  selectedDayBackgroundColor?: string;
  arrowColor?: string;
  textDisabledColor?: string;
  textInactiveColor?: string;
  backgroundColor?: string;
  dotColor?: string;
  selectedDotColor?: string;
  disabledArrowColor?: string;
  textDayFontFamily?: TextStyle['fontFamily'];
  textMonthFontFamily?: TextStyle['fontFamily'];
  textDayHeaderFontFamily?: TextStyle['fontFamily'];
  textDayFontWeight?: TextStyle['fontWeight'];
  textMonthFontWeight?: TextStyle['fontWeight'];
  textDayHeaderFontWeight?: TextStyle['fontWeight'];
  textDayFontSize?: number;
  textMonthFontSize?: number;
  textDayHeaderFontSize?: number;
  agendaDayTextColor?: string;
  agendaDayNumColor?: string;
  agendaTodayColor?: string;
  agendaKnobColor?: string;
  foregroundColor?: string;
  separatorColor?: string;
  processedColor?: string;
  processingColor?: string;
  failedColor?: string;
  textSecondaryColor?: string;
  textDefaultColor?: string;
  textColor?: string;
  textLinkColor?: string;
  todayButtonFontFamily?: TextStyle['fontFamily'];
  todayButtonFontWeight?: TextStyle['fontWeight'];
  todayButtonFontSize?: number;
  textDayStyle?: TextStyle;
  dotStyle?: object;
  arrowStyle?: ViewStyle;
  todayBackgroundColor?: string;
  disabledDotColor?: string;
  inactiveDotColor?: string;
  todayDotColor?: string;
  todayButtonTextColor?: string;
  todayButtonPosition?: string;
  arrowHeight?: number;
  arrowWidth?: number;
}
