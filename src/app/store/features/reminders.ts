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

export const updateReminder = (reminder: Reminder) => {
  return typedAction('reminders/UPDATE_REMINDER', { reminder });
};

type ReminderAction = ReturnType<typeof addReminder | typeof updateReminder>;

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
    case 'reminders/UPDATE_REMINDER':
      return {
        ...state,
        list: state.list.map((reminder) =>
          reminder.date === action.payload.reminder.date
            ? action.payload.reminder
            : reminder
        ),
      };
    default:
      return state;
  }
}

export const remindersListSelector = (state: RootState) => state.reminders.list;
