import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Reminder } from '../../../app/models/reminder';
import moment from 'moment';
import './RemindersDetails.css';

interface Props {
  reminder: Reminder;
  onClickEdit: () => void;
}

export const RemindersDetails: React.FC<Props> = ({
  reminder,
  onClickEdit,
}) => {
  return (
    <Container>
      <Row>
        <Col md="12" className="reminder-details__header-container">
          <div>
            <h4 className="reminder-details__header">{reminder.description}</h4>
            {reminder.city.city}
          </div>
          <Button
            variant="info"
            className="reminder-details__edit-button"
            onClick={onClickEdit}
          >
            Edit
          </Button>
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
