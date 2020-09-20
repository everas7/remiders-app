import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { InputText } from '../../../app/common/input-text/InputText';

export const RemindersForm = () => {
  const [form, setForm] = useState({
    reminder: {
      value: '',
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

  return (
    <Form>
      <InputText
        value={form.reminder.value}
        onChange={handleReminderChange}
        placeholder="Reminder"
      />
    </Form>
  );
};
