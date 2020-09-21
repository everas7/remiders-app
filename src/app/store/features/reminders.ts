import { typedAction } from '../helpers';
import { Reminder } from '../../models/reminder';
import { RootState } from '..';

export interface ReminderState {
  list: Reminder[];
}

const initialState: ReminderState = { list: [] };

export const addReminder = (reminder: Reminder) => {
  return typedAction('reminders/ADD_REMINDER', { reminder });
};

type ReminderAction = ReturnType<typeof addReminder>;

export function remindersReducer(
  state = initialState,
  action: ReminderAction
): ReminderState {
  switch (action.type) {
    case 'reminders/ADD_REMINDER':
      return {
        ...state,
        list: [...state.list, action.payload.reminder],
      };
    default:
      return state;
  }
}

export const remindersListSelector = (state: RootState) => state.reminders.list;
