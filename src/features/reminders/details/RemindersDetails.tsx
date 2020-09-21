import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Reminder } from '../../../app/models/reminder';

interface Props {
  reminder: Reminder;
}

export const RemindersDetails: React.FC<Props> = ({ reminder }) => {
  return (
    <Container>
      <Row>
        <Col md="12">{reminder.description}</Col>
        <Col md="12">{reminder.city}</Col>
        <Col md="12">
          {new Date(reminder.date).setHours(
            +reminder.time.split(':')[0],
            +reminder.time.split(':')[1]
          ).toString()}
        </Col>
      </Row>
    </Container>
  );
};
