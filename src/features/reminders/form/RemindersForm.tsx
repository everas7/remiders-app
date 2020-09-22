import React, { useState } from 'react';
import { Form, Container, Row, Col, FormGroup, Button } from 'react-bootstrap';
import { InputText } from '../../../app/common/input-text/InputText';
import { InputSelect } from '../../../app/common/input-select/InputSelect';
import { InputTime } from '../../../app/common/input-time/InputTime';
import { ColorPicker } from '../../../app/common/color-picker/ColorPicker';
import weatherApi from '../../../app/api/weather-api';
import { ColorResult } from 'react-color';
import { Reminder } from '../../../app/models/reminder';
import { checkValidators } from '../../../app/helpers/validation-helper';

interface Props {
  onSubmit: (reminder: Partial<Reminder>) => void;
  reminder?: Reminder;
}

export const RemindersForm: React.FC<Props> = ({ onSubmit, reminder }) => {
  const cities = weatherApi.Cities.list();

  const [form, setForm] = useState({
    valid: false,
    controls: {
      description: {
        value: reminder?.description || '',
        valid: !!reminder?.description,
        validators: {
          isRequired: true,
          maxLength: 30,
        },
      },
      city: {
        value: reminder?.city || null,
        valid: !!reminder?.city,
        validators: {
          isRequired: true,
        },
      },
      time: {
        value: reminder?.time || '',
        valid: !!reminder?.time,
        validators: {
          isRequired: true,
        },
      },
      color: {
        value: reminder?.color || 'rgb(255, 105, 0)',
        valid: true,
        validators: {},
      },
    },
  });

  const checkFormValidity = (skipControl?: string) => {
    let isFormValid = true;
    Object.keys(form.controls).forEach((key) => {
      if (key === skipControl) {
        return;
      }
      isFormValid =
        isFormValid && form.controls[key as keyof typeof form.controls].valid;
    });
    return isFormValid;
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valid = checkValidators(
      e.target.value,
      form.controls.description.validators
    );

    setForm({
      ...form,
      controls: {
        ...form.controls,
        description: {
          ...form.controls.description,
          value: e.target.value,
          valid,
        },
      },
      valid: checkFormValidity('description') && valid,
    });
  };

  const handleCityChange = (value: any) => {
    const valid = checkValidators(value, form.controls.city.validators);

    setForm({
      ...form,
      controls: {
        ...form.controls,
        city: {
          ...form.controls.city,
          value,
          valid,
        },
      },
      valid: checkFormValidity('city') && valid,
    });
  };

  const handleTimeChange = (value: string) => {
    const valid = checkValidators(value, form.controls.time.validators);

    setForm({
      ...form,
      controls: {
        ...form.controls,
        time: {
          ...form.controls.time,
          value,
          valid,
        },
      },
      valid: checkFormValidity('time') && valid,
    });
  };

  const handleColorChange = (color: ColorResult) => {
    setForm({
      ...form,
      controls: {
        ...form.controls,
        color: {
          ...form.controls.color,
          value: `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`,
        },
      },
      valid: checkFormValidity('color'),
    });
  };

  const handleSubmit = () => {
    onSubmit({
      description: form.controls.description.value,
      city: form.controls.city.value!,
      time: form.controls.time.value,
      color: form.controls.color.value,
      date: reminder?.date,
    });
  };

  return (
    <Form as={Container}>
      <Row>
        <FormGroup as={Col} md="12" style={{ marginTop: '1rem' }}>
          <InputText
            id="description"
            value={form.controls.description.value}
            onChange={handleDescriptionChange}
            maxCharacters={form.controls.description.validators.maxLength}
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
            value={form.controls.city.value as any}
            onChange={handleCityChange}
            placeholder="City"
            id="city"
          />
        </FormGroup>
        <FormGroup as={Col} md="12">
          <InputTime
            onChange={handleTimeChange}
            value={form.controls.time.value}
            id="time"
          />
        </FormGroup>
        <FormGroup as={Col} md="12">
          <ColorPicker
            onChange={handleColorChange}
            color={form.controls.color.value}
          />
        </FormGroup>

        <Col md="12" className="justify-content-end">
          <Button
            variant="primary"
            type="submit"
            disabled={!form.valid}
            onClick={handleSubmit}
            id="reminder-submit"
          >
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
