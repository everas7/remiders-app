import React, { useState } from 'react';
import { Form, Container, Row, Col, FormGroup } from 'react-bootstrap';
import { InputText } from '../../../app/common/input-text/InputText';
import { InputSelect } from '../../../app/common/input-select/InputSelect';
import weatherApi from '../../../app/api/weather-api';

export const RemindersForm = () => {
  const cities = weatherApi.Cities.list();

  const [form, setForm] = useState({
    reminder: {
      value: '',
      valid: false,
      validators: [],
    },
    city: {
      value: null,
      valid: false,
      validators: [],
    },
  });

  const handleReminderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      reminder: {
        ...form.reminder,
        value: e.target.value,
      },
    });
  };

  const handleCityChange = (value: any) => {
    setForm({
      ...form,
      city: {
        ...form.city,
        value: value,
      },
    });
  };

  return (
    <Form as={Container}>
      <Row>
        <FormGroup as={Col} md="12">
          <InputText
            value={form.reminder.value}
            onChange={handleReminderChange}
            placeholder="Reminder"
          />
        </FormGroup>
        <FormGroup as={Col} md="12">
          <InputSelect
            options={cities.map((city: any) => ({
              value: city.city + city.state,
              label: city.city,
            }))}
            value={form.city.value}
            onChange={handleCityChange}
            placeholder="City"
          />
        </FormGroup>
      </Row>
    </Form>
  );
};
