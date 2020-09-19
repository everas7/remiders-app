import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CalendarItem } from './calendar-item/CalendarItem';
import { CalendarHeader } from './calendar-header/CalendarHeader';
import {
  daysInMonth,
  isWeekend,
  isSameMonth,
} from '../../helpers/date-helper';

const DAYS_PER_ROW = 7;

type CalendarWeek = Date[];
type CalendarMonth = CalendarWeek[];

export const getCalendarMonth = (
  month: number,
  year: number
): CalendarMonth => {
  const date = new Date(year, month, 1);
  const calendar: CalendarMonth = [];
  const dayOfWeek = date.getDay();
  const calendarStartingDate = new Date(year, month, -dayOfWeek + 1);
  const monthDaysCount = daysInMonth(date.getFullYear(), date.getMonth());
  const rows = Math.ceil((monthDaysCount + dayOfWeek) / 7);
  for (let row = 0; row < rows; row++) {
    const week: CalendarWeek = [];

    for (let day = 0; day < DAYS_PER_ROW; day++) {
      week.push(new Date(calendarStartingDate));
      calendarStartingDate.setDate(calendarStartingDate.getDate() + 1);
    }
    calendar.push(week);
  }
  return calendar;
};

export const Calendar = () => {
  const currentDate = new Date();
  const calendarMonth: CalendarMonth = getCalendarMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  return (
    <Container fluid>
      <CalendarHeader />
      {calendarMonth.map((week) => (
        <Row>
          {week.map((date) => (
            <CalendarItem
              inverted={isWeekend(date)}
              disabled={!isSameMonth(date, currentDate)}
            >
              {date.getDate()}
            </CalendarItem>
          ))}
        </Row>
      ))}
    </Container>
  );
};
