import React, { useState, useRef, MouseEvent } from 'react';
import { Calendar } from '../../app/common/calendar/Calendar';
import { Modal, Overlay, Popover } from 'react-bootstrap';
import { RemindersForm } from './form/RemindersForm';
import { Reminder } from '../../app/models/reminder';

export const Reminders = () => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<EventTarget>();
  const [reminderPreview, setReminderPreview] = useState<Partial<Reminder>>();
  const ref = useRef(null);

  const handleCalendarItemClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    date: Date
  ) => {
    if (!show) {
      setShow(!show);
      setTarget(event.currentTarget);
      setReminderPreview({
        date,
      });
    }
  };

  const handleClose = () => {
    setShow(false);
    setTarget(undefined);
    setReminderPreview(undefined);
  };

  return (
    <div ref={ref}>
      <Calendar
        onItemClick={handleCalendarItemClick}
        reminderPreview={reminderPreview}
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
            <RemindersForm />
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
};
