import React, { useState, useRef, MouseEvent } from 'react';
import { Calendar } from '../../app/common/calendar/Calendar';
import { Overlay, Popover } from 'react-bootstrap';
import { RemindersForm } from './form/RemindersForm';
import { RemindersDetails } from './details/RemindersDetails';
import { Reminder } from '../../app/models/reminder';
import { useSelector } from 'react-redux';
import {
  remindersListSelector,
  updateReminder,
  deleteMultipleReminders,
  deleteReminder,
} from '../../app/store/features/reminders';
import { useDispatch } from 'react-redux';
import { addReminder } from '../../app/store/features/reminders';
import weatherApi from '../../app/api/weather-api';
import './Reminders.css';

export const Reminders = () => {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [target, setTarget] = useState<EventTarget>();
  const [reminderPreview, setReminderPreview] = useState<Partial<Reminder>>();
  const [currentReminder, setCurrentReminder] = useState<Reminder>();
  const ref = useRef(null);

  const reminders = useSelector(remindersListSelector);
  const dispatch = useDispatch();

  const handleCalendarItemClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    date: Date
  ) => {
    if (!show) {
      setShow(!show);
      setTarget(event.currentTarget);
      setReminderPreview({
        date,
        time: '23:59',
      });
    }
  };

  const handleCalendarReminderClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    reminder: Reminder
  ) => {
    event.stopPropagation();
    if (!show) {
      setShow(!show);
      setTarget(event.currentTarget);
      setCurrentReminder(reminder);
      setReminderPreview(undefined);
    }
  };

  const handleClickEdit = () => {
    setEditMode(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setTarget(undefined);
    setReminderPreview(undefined);
    setCurrentReminder(undefined);
  };

  const handleSubmit = async (reminder: Partial<Reminder>) => {
    const forecasts = await weatherApi.Weather.getForecastByCity(
      reminder.city!
    );
    let date = reminder?.date || reminderPreview?.date;
    reminder.weather = forecasts?.daily?.filter(
      (w: any) => new Date(w.dt * 1000).toDateString() === date?.toDateString()
    )[0]?.weather[0]?.description;
    if (!editMode) {
      dispatch(
        addReminder({ ...(reminder as Reminder), date: reminderPreview?.date! })
      );
    } else {
      dispatch(updateReminder(reminder as Reminder));
    }

    handleClose();
  };

  const handleRemoveMultipleReminders = (
    reminders: Reminder[]
  ) => {
    dispatch(deleteMultipleReminders(reminders));
  };

  const handleRemoveReminder = (
    reminder: Reminder
  ) => {
    dispatch(deleteReminder(reminder));
  };

  return (
    <div ref={ref}>
      <Calendar
        onItemClick={handleCalendarItemClick}
        onReminderClick={handleCalendarReminderClick}
        onRemoveMultipleReminders={handleRemoveMultipleReminders}
        onRemoveReminder={handleRemoveReminder}
        reminderPreview={reminderPreview}
        reminders={reminders}
      />
      <Overlay
        show={show}
        target={target as any}
        placement="right"
        container={ref.current}
        containerPadding={20}
        rootClose
        onHide={handleClose}
      >
        <Popover id="popover-contained">
          <Popover.Content>
            {currentReminder && !editMode ? (
              <RemindersDetails
                reminder={currentReminder}
                onClickEdit={handleClickEdit}
              />
            ) : (
              <RemindersForm
                reminder={currentReminder}
                onSubmit={handleSubmit}
              />
            )}
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
};
