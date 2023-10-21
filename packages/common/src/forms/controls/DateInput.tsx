import React, { InputHTMLAttributes, ChangeEvent, Component } from 'react';
import { css } from 'emotion';
import styled from '@emotion/styled';
import { IoIosCalendar } from 'react-icons/io';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { DateTime } from 'luxon';
import { colors } from '../../styleSettings';
import { Dropdown, DropdownContent } from '../../dropdown';
import { Input } from './Input';
import { LocaleUtils } from 'react-day-picker/types/utils';

const dayPickerStyles = css({
  '& .DayPicker-wrapper': {
    outline: 'none'
  },

  '& .DayPicker-NavButton': {
    outline: 'none'
  },

  '& .DayPicker-Weekday': {
    color: 'rgba(255, 255, 255, 0.5)'
  },

  '& .DayPicker-Day': {
    borderRadius: '2px',
    outline: 'none',
    transition: 'all 0.2s',

    '&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },

    '&:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },

    '&.DayPicker-Day--today': {
      color: colors.main,

      '&.DayPicker-Day--selected': {
        color: colors.white
      }
    },

    '&.DayPicker-Day--selected': {
      '&, &:hover, &:focus': {
        backgroundColor: colors.main
      }
    }
  }
});

const DateInputDropdown = styled(Dropdown)({
  display: 'block',
  width: '100%'
});

const DateInputRoot = styled('div')({
  display: 'block',
  position: 'relative',
  width: '100%'
});

const CalendarContainer = styled('div')({
  display: 'block'
});

// Helpers
// TODO: Move to shared/helpers/dateHelpers.ts

// Note:
// - "outer" is either ISO date string in a 'YYYY-MM-DD' format (valid)
//   or any other string (invalid). This is coming as `props.value`.
// - "inner" is a user input, a localized date string (currently, 'DD/MM/YYYY'
//   explicitly) or any other string entered by the user (invalid)
// - "date" is an instance of `Date`

// NOTE: User input format will depend on locale soon
const INPUT_FORMAT = 'dd/MM/yyyy';
const ISO_DATE_FORMAT = 'yyyy-MM-dd';

function outerToInnerFormat(outerDateString?: string): string | undefined {
  if (!outerDateString) return '';
  const dateTime = DateTime.fromFormat(outerDateString, ISO_DATE_FORMAT);
  if (dateTime.isValid) return dateTime.toFormat(INPUT_FORMAT);
  // Note: returning original as a fallback despite it might be invalid
  return outerDateString;
}

function innerToOuterFormat(innerDateString?: string): string | undefined {
  if (!innerDateString) return void 0;
  const dateTime = DateTime.fromFormat(innerDateString, INPUT_FORMAT);
  if (dateTime.isValid) return dateTime.toISODate();
  // Note: returning original as a fallback despite it might be invalid
  return innerDateString;
}

function dateToOuterFormat(date?: Date): string | undefined {
  if (!date) return void 0;
  const dateTime = DateTime.fromJSDate(date);
  if (!dateTime.isValid) return void 0;
  return dateTime.toFormat(ISO_DATE_FORMAT);
}

function outerToDateFormat(outerDateString?: string): Date | undefined {
  if (!outerDateString) return void 0;
  const dateTime = DateTime.fromFormat(outerDateString, ISO_DATE_FORMAT);
  if (!dateTime.isValid) return void 0;
  return dateTime.toJSDate();
}

interface YearMonthFormProps {
  date: Date;
  locale?: string;
  localeUtils: LocaleUtils;
  onChange: (date: Date) => void;
}

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear - 100, 0);
const toMonth = new Date(currentYear, 11);

function YearMonthForm({
  date,
  locale = 'en',
  localeUtils,
  onChange
}: YearMonthFormProps) {
  const months = localeUtils.getMonths(locale);

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { year, month } = e.target.form as any;
    onChange(new Date(year.value, month.value));
  };

  return (
    <div className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

// Exported component

export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  focused?: boolean;
  filled?: boolean;
  value?: string;
  // Note: Necessary hackery (react-final-form handles both too)
  onChange?: ((value?: string) => void) &
    (<T>(event: ChangeEvent<T> | any) => void);
}

export class DateInput extends Component<DateInputProps> {
  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(innerToOuterFormat(event.target.value));
    }
  };

  handleCalendarDayClick = (date: Date) => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(dateToOuterFormat(date));
    }
  };

  handleYearMonthChange = (date: Date) => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(dateToOuterFormat(date));
    }
  };

  render() {
    const { handleInputChange, handleCalendarDayClick } = this;
    const {
      focused,
      value,
      onChange,
      width,
      ...inputComponentProps
    } = this.props;
    const selectedDate = outerToDateFormat(value);
    const inputValue = outerToInnerFormat(value);

    return (
      <DateInputDropdown>
        {({ isExpanded, show }) => (
          <DateInputRoot>
            <Input
              {...inputComponentProps}
              type="text"
              icon={IoIosCalendar}
              focused={focused || isExpanded}
              onFocus={show}
              value={inputValue}
              onChange={handleInputChange}
            />

            <DropdownContent alignRight={true} visible={isExpanded}>
              <CalendarContainer>
                <DayPicker
                  className={dayPickerStyles}
                  selectedDays={selectedDate}
                  month={selectedDate}
                  onDayClick={handleCalendarDayClick}
                  captionElement={({ date, localeUtils }) => (
                    <YearMonthForm
                      date={date}
                      localeUtils={localeUtils}
                      onChange={this.handleYearMonthChange}
                    />
                  )}
                />
              </CalendarContainer>
            </DropdownContent>
          </DateInputRoot>
        )}
      </DateInputDropdown>
    );
  }
}
