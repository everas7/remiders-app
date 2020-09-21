import React, { useState } from 'react';
import { Form, Container, Row, Col, FormGroup } from 'react-bootstrap';
import { InputText } from '../../../app/common/input-text/InputText';
import { InputSelect } from '../../../app/common/input-select/InputSelect';
import { InputTime } from '../../../app/common/input-time/InputTime';
import { ColorPicker } from '../../../app/common/color-picker/ColorPicker';
import weatherApi from '../../../app/api/weather-api';
import { ColorResult } from 'react-color';

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
    time: {
      value: '',
      valid: false,
    },
    color: {
      value: '',
      valid: false,
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

  const handleTimeChange = (value: string) => {
    setForm({
      ...form,
      time: {
        ...form.time,
        value,
      },
    });
  };

  const handleColorChange = (color: ColorResult) => {
    setForm({
      ...form,
      color: {
        ...form.color,
        value: color.hex,
      },
    });
  };

  return (
    <Form as={Container}>
      <Row>
        <FormGroup as={Col} md="12" style={{ marginTop: '1rem' }}>
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
        <FormGroup as={Col} md="12">
          <InputTime onChange={handleTimeChange} value={form.time.value} />
        </FormGroup>
        <FormGroup as={Col} md="12">
          <ColorPicker onChange={handleColorChange} color={form.color.value} />
        </FormGroup>
      </Row>
    </Form>
  );
};
