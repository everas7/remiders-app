import React, {MouseEvent} from 'react';
import './CalendarItem.css';
import { Col, Button } from 'react-bootstrap';

interface Props {
  inverted?: boolean;
  disabled?: boolean;
  onClick: (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
}

export const CalendarItem: React.FC<Props> = ({
  inverted,
  children,
  disabled = false,
  onClick,
}) => {
  return (
    <Col
      onClick={onClick}
      className={`calendar-item ${inverted ? 'calendar-item--inverted' : ''} ${
        disabled ? 'calendar-item--disabled' : ''
      }`}
    >
      <div className="calendar-item__header">{children}</div>
      <div className="calendar-item__content">
        <div className="calendar-item__reminder"></div>
      </div>
    </Col>
  );
};
