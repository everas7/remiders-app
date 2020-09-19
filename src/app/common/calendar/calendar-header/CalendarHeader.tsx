import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './CalendarHeader.css';

import { WEEK_DAYS } from './constants';

export const CalendarHeader = () => {
  return (
    <Row className="calendar-header__container">
      {WEEK_DAYS.map((dayName) => (
        <Col>{dayName}</Col>
      ))}
    </Row>
  );
};
