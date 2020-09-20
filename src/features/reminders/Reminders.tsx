import React, { useState, useRef, MouseEvent } from 'react';
import { Calendar } from '../../app/common/calendar/Calendar';
import { Modal, Overlay, Popover } from 'react-bootstrap';
import { RemindersForm } from './form/RemindersForm';

export const Reminders = () => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<EventTarget>();
  const ref = useRef(null);

  const handleCalendarItemClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    console.log(event)
    if (!show) {
      setShow(!show);
      setTarget(event.currentTarget);
    }
  };

  const handleClose = () => {
    setShow(false);
    setTarget(undefined);
  };

  return (
    <div ref={ref}>
      <Calendar onItemClick={handleCalendarItemClick} />
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
