import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Reminder } from '../../../app/models/reminder';
import moment from 'moment';
import './RemindersDetails.css';

interface Props {
  reminder: Reminder;
}

export const RemindersDetails: React.FC<Props> = ({ reminder }) => {
  return (
    <Container>
      <Row>
        <Col md="12" className="reminder-details__header" as="h4">
          {reminder.description}
        </Col>
        <Col md="12" className="reminder-details__subheader">
          {reminder.city.city}
        </Col>
        <Col md="12" className="reminder-details__content">
          <div>
            {moment(
              new Date(
                reminder.date.setHours(
                  +reminder.time.split(':')[0],
                  +reminder.time.split(':')[1]
                )
              )
            ).format('LLL')}
          </div>
          <div className="italic">{reminder.weather?.toUpperCase()}</div>
        </Col>
      </Row>
    </Container>
  );
};
