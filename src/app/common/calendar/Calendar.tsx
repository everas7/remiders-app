import React, { MouseEvent, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';
import { CalendarItem } from './calendar-item/CalendarItem';
import { CalendarHeader } from './calendar-header/CalendarHeader';
import { daysInMonth, isWeekend, isSameMonth } from '../../helpers/date-helper';
import { Reminder } from '../../models/reminder';
import moment from 'moment';
import './Calendar.css';

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
  onReminderClick: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    reminder: Reminder
  ) => void;
  reminderPreview?: Partial<Reminder>;
  reminders: Reminder[];
}

export const Calendar: React.FC<Props> = ({
  onItemClick,
  onReminderClick,
  reminderPreview,
  reminders,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarMonth: CalendarMonth = getCalendarMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <>
      <div className="calendar-controls-area">
        <ArrowLeft onClick={previousMonth} size={30} />
        <h2>{moment(currentDate).format('MMMM YYYY').toUpperCase()}</h2>
        <ArrowRight onClick={nextMonth} size={30} />
      </div>
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
                    ? [
                        ...reminders.filter(
                          (r) => r.date.toDateString() === date.toDateString()
                        ),
                        reminderPreview as Reminder,
                      ]
                    : reminders.filter(
                        (r) => r.date.toDateString() === date.toDateString()
                      )
                }
                onClick={(e) => onItemClick(e, date)}
                onClickReminder={onReminderClick}
              >
                {date.getDate()}
              </CalendarItem>
            ))}
          </Row>
        ))}
      </Container>
    </>
  );
};
