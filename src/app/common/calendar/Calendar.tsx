import React, { MouseEvent } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CalendarItem } from './calendar-item/CalendarItem';
import { CalendarHeader } from './calendar-header/CalendarHeader';
import { daysInMonth, isWeekend, isSameMonth } from '../../helpers/date-helper';
import { Reminder } from '../../models/reminder';

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

interface Props {
  onItemClick: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    date: Date
  ) => void;
  reminderPreview?: Partial<Reminder>;
}

export const Calendar: React.FC<Props> = ({ onItemClick, reminderPreview }) => {
  const currentDate = new Date();
  const calendarMonth: CalendarMonth = getCalendarMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
    console.log(reminderPreview, 'veamos')
  return (
    <Container fluid>
      <CalendarHeader />
      {calendarMonth.map((week, weekIndex) => (
        <Row key={weekIndex}>
          {week.map((date, dayIndex) => (
            <CalendarItem
              key={weekIndex + dayIndex}
              inverted={isWeekend(date)}
              disabled={!isSameMonth(date, currentDate)}
              reminders={
                reminderPreview?.date?.toDateString() === date.toDateString()
                  ? [reminderPreview as Reminder]
                  : []
              }
              onClick={(e) => onItemClick(e, date)}
            >
              {date.getDate()}
            </CalendarItem>
          ))}
        </Row>
      ))}
    </Container>
  );
};
