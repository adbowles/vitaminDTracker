import invoke from 'lodash/invoke';
import XDate from 'xdate';

// @ts-expect-error
import {sameMonth} from '../../dateutils';
// @ts-expect-error
import {xdateToData, toMarkingFormat} from '../../interface';
import {CalendarContextProviderProps} from './Provider';
import {UpdateSource} from '../../types';


const commons = require('../commons');
const TOP_POSITION = 65;

class Presenter {
  _isPastDate(date: Date) {
    const today = new XDate();
    const d = new XDate(date);

    if (today.getFullYear() > d.getFullYear()) {
      return true;
    }
    if (today.getFullYear() === d.getFullYear()) {
      if (today.getMonth() > d.getMonth()) {
        return true;
      }
      if (today.getMonth() === d.getMonth()) {
        if (today.getDate() > d.getDate()) {
          return true;
        }
      }
    }
    return false;
  }

  _getIconDown = () => {
    return require('../../img/down.png');
  };

  _getIconUp = () => {
    return require('../../img/up.png');
  };

  getButtonIcon = (date: Date, showTodayButton = true) => {
    if (!showTodayButton) {
      return undefined;
    }
    const icon = this._isPastDate(date) ? this._getIconDown() : this._getIconUp();
    return icon;
  };

  setDate = (props: CalendarContextProviderProps, date: Date, newDate: Date, updateState: (buttonIcon: any) => void, updateSource: UpdateSource) => {
    const isSameMonth = sameMonth(new XDate(date), new XDate(newDate));
    const buttonIcon = this.getButtonIcon(date, props.showTodayButton);

    updateState(buttonIcon);

    invoke(props, 'onDateChanged', date, updateSource);

    if (!isSameMonth) {
      invoke(props, 'onMonthChange', xdateToData(new XDate(date)), updateSource);
    }
  };

  setDisabled = (showTodayButton: boolean, newDisabledValue: boolean, oldDisabledValue: boolean, updateState: (disabled: boolean) => void) => {
    if (!showTodayButton || newDisabledValue === oldDisabledValue) {
      return;
    }
    updateState(newDisabledValue);
  };

  shouldAnimateTodayButton = (props: CalendarContextProviderProps) => {
    return props.showTodayButton;
  };

  _isToday = (date: Date) => {
    const today = toMarkingFormat(new XDate());
    return today === date;
  };

  getTodayDate = () => {
    return toMarkingFormat(new XDate());
  };

  getPositionAnimation = (date: Date, todayBottomMargin = 0) => {
    const toValue = this._isToday(date) ? TOP_POSITION : -todayBottomMargin || -TOP_POSITION;
    return {
      toValue,
      tension: 30,
      friction: 8,
      useNativeDriver: true
    };
  };

  shouldAnimateOpacity = (props: CalendarContextProviderProps) => {
    return props.disabledOpacity;
  };

  getOpacityAnimation = ({disabledOpacity = 0}: CalendarContextProviderProps, disabled: boolean) => {
    return {
      toValue: disabled ? disabledOpacity : 1,
      duration: 500,
      useNativeDriver: true
    };
  };

  getTodayFormatted = () => {
    // @ts-expect-error
    const todayString = XDate.locales[XDate.defaultLocale].today || commons.todayString;
    const today = todayString.charAt(0).toUpperCase() + todayString.slice(1);
    return today;
  };
}

export default Presenter;
