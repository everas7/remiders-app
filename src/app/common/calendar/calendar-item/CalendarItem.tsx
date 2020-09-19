import React from 'react';
import './CalendarItem.css';
import { Col, Button } from 'react-bootstrap';

interface Props {
  inverted?: boolean;
  disabled?: boolean;
}

export const CalendarItem: React.FC<Props> = ({
  inverted,
  children,
  disabled = false,
}) => {
  return (
    <Col
      className={`calendar-item ${inverted ? 'calendar-item--inverted' : ''} ${
        disabled ? 'calendar-item--disabled' : ''
      }`}
    >
      <div className="calendar-item__header">{children}</div>
      <div className="calendar-item__content">
        <div className="calendar-item__reminder"></div>
        <Button variant="info" className="add-reminder">Add Reminder</Button>
      </div>
    </Col>
  );
};
