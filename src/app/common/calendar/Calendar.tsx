import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CalendarItem } from './calendar-item/CalendarItem';
import { CalendarHeader } from './calendar-header/CalendarHeader';

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

function getDaysInMonth(month: number, year: number) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

type CalendarWeek = Date[];
type CalendarMonth = CalendarWeek[];

const getCalendarMonth = (month: number, year: number): CalendarMonth => {
  const date = new Date(year, month, 1);
  const calendar: CalendarMonth = [];
  const dayOfWeek = date.getDay();
  const calendarStartingDate = new Date(year, month, -dayOfWeek + 1);
  const monthDaysCount = daysInMonth(date.getFullYear(), date.getMonth());
  // todo math.ceil
  const rows = (monthDaysCount + dayOfWeek) / 7;
  //   for (let count = 0; count < dayOfWeek; count++) {
  //     firstWeek.unshift(new Date(lastMonthLastDate));
  //     date.setDate(date.getDate() - 1);
  //   }

  for (let i = 0; i < rows; i++) {
    const week: CalendarWeek = [];

    for (let j = 0; j < 7; j++) {
      week.push(new Date(calendarStartingDate));
      calendarStartingDate.setDate(calendarStartingDate.getDate() + 1);
    }
    calendar.push(week);
  }
  return calendar;
};

export const isWeekend = (date: Date) => {
  const day = date.getDay();
  if (day === 0 || day === 6) {
    return true;
  }
  return false;
};

export const isCurrentMonth = (date: Date) => {
  return date.getMonth() === new Date().getMonth();
};

export const Calendar = () => {
  const currentDate = new Date();
  const calendarMonth: CalendarMonth = getCalendarMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  console.log(calendarMonth, 'veamos');
  return (
    <Container fluid>
      <CalendarHeader />
      {calendarMonth.map((week) => (
        <Row>
          {week.map((date) => (
            <CalendarItem
              inverted={isWeekend(date)}
              disabled={!isCurrentMonth(date)}
            >
              {date.getDate()}
            </CalendarItem>
          ))}
        </Row>
      ))}
    </Container>
  );
};
