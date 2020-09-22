import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent, wait } from '@testing-library/react';
import 'jest-canvas-mock';

import { Reminders } from './Reminders';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  // container *must* be attached to document so events work correctly.
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('changes value when clicked', async () => {
  const onChange = jest.fn();
  act(() => {
    render(
      <Provider store={store}>
        <Reminders />
      </Provider>,
      container
    );
  });

  // get ahold of the button element, and trigger some clicks on it
  const calendarItem = document.getElementsByClassName('calendar-item')[10];
  const day = calendarItem.getElementsByClassName('calendar-item__header')[0]
    .innerHTML;

  act(() => {
    fireEvent.click(calendarItem);
  });

  expect(
    calendarItem.querySelectorAll('.calendar-item__reminder > div')[0].innerHTML
  ).toBe('New reminder');

  // Fill Description field
  const description = document.getElementById('description');
  act(() => {
    fireEvent.change(description, { target: { value: 'Go to concert' } });
  });
  expect(description.getAttribute('value')).toBe('Go to concert');

  // Fill city field
  const city = document.querySelector('#city  .select__control');
  act(() => {
    fireEvent.keyDown(city, { keyCode: 40 });
  });
  act(() => {
    fireEvent.keyDown(city, { keyCode: 13 });
  });
  expect(city.querySelector('.select__single-value').innerHTML).toBe(
    'New York'
  );

  // Fill time field

  const time = document.querySelector('input[type="time"]');
  time.setAttribute('value', '10:20');
  act(() => {
    fireEvent.change(time);
  });
  expect(time.getAttribute('value')).toBe('10:20');

  // Submit reminder
  const submitReminder = document.getElementById('reminder-submit');
  act(() => {
    fireEvent.click(submitReminder);
  });

  wait(
    () => {
      expect(
        calendarItem.querySelectorAll('.calendar-item__reminder > div')[0]
          .innerHTML
      ).toBe('Go to concert');
    },
    {
      timeout: 5000,
    }
  );
});
