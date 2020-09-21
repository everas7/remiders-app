import React, { useState } from 'react';
import { Form, Container, Row, Col, FormGroup, Button } from 'react-bootstrap';
import { InputText } from '../../../app/common/input-text/InputText';
import { InputSelect } from '../../../app/common/input-select/InputSelect';
import { InputTime } from '../../../app/common/input-time/InputTime';
import { ColorPicker } from '../../../app/common/color-picker/ColorPicker';
import weatherApi from '../../../app/api/weather-api';
import { ColorResult } from 'react-color';
import { Reminder } from '../../../app/models/reminder';

interface Props {
  onSubmit: (reminder: Partial<Reminder>) => void;
  reminder?: Reminder;
}

export const RemindersForm: React.FC<Props> = ({ onSubmit, reminder }) => {
  const cities = weatherApi.Cities.list();

  const [form, setForm] = useState({
    description: {
      value: reminder?.description ||  '',
      valid: false,
      validators: [],
    },
    city: {
      value: reminder?.city || null,
      valid: false,
      validators: [],
    },
    time: {
      value: reminder?.time || '',
      valid: false,
    },
    color: {
      value: reminder?.color || '',
      valid: false,
    },
  });

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      description: {
        ...form.description,
        value: e.target.value,
      },
    });
  };

  const handleCityChange = (value: any) => {
    setForm({
      ...form,
      city: {
        ...form.city,
        value
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
        value: `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`,
      },
    });
  };

  const handleSubmit = () => {
    onSubmit({
      description: form.description.value,
      city: form.city.value!,
      time: form.time.value,
      color: form.color.value,
      date: reminder?.date
    });
  };

  return (
    <Form as={Container}>
      <Row>
        <FormGroup as={Col} md="12" style={{ marginTop: '1rem' }}>
          <InputText
            value={form.description.value}
            onChange={handleDescriptionChange}
            placeholder="Reminder"
          />
        </FormGroup>
        <FormGroup as={Col} md="12">
          <InputSelect
            options={cities.map((city: any) => ({
              ...city,
              value: city.city + city.state,
              label: city.city,
            }))}
            value={form.city.value as any}
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

        <Col md="12" className="justify-content-end">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
