import React, { useState, useRef, MouseEvent } from 'react';
import { Calendar } from '../../app/common/calendar/Calendar';
import { Modal, Overlay, Popover } from 'react-bootstrap';
import { RemindersForm } from './form/RemindersForm';
import { Reminder } from '../../app/models/reminder';
import { useSelector } from 'react-redux';
import { remindersListSelector } from '../../app/store/features/reminders';
import { useDispatch } from 'react-redux';
import { addReminder } from '../../app/store/features/reminders';

export const Reminders = () => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<EventTarget>();
  const [reminderPreview, setReminderPreview] = useState<Partial<Reminder>>();
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
        time: '23:59'
      });
    }
  };

  const handleClose = () => {
    setShow(false);
    setTarget(undefined);
    setReminderPreview(undefined);
  };

  const handleSubmit = (reminder: Partial<Reminder>) => {
    dispatch(addReminder({ ...reminder as Reminder, date: reminderPreview?.date! }));
    handleClose();
  };

  return (
    <div ref={ref}>
      <Calendar
        onItemClick={handleCalendarItemClick}
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
            <RemindersForm onSubmit={handleSubmit} />
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
};
