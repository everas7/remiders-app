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

export const deleteMultipleReminders = (reminders: Reminder[]) => {
  return typedAction('reminders/DELETE_MULTIPLE_REMINDERS', { reminders });
};

export const deleteReminder = (reminder: Reminder) => {
  return typedAction('reminders/DELETE_REMINDER', { reminder });
};

type ReminderAction = ReturnType<
  | typeof addReminder
  | typeof updateReminder
  | typeof deleteMultipleReminders
  | typeof deleteReminder
>;

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
    case 'reminders/DELETE_MULTIPLE_REMINDERS':
      return {
        ...state,
        list: state.list.filter(
          (reminder) =>
            !action.payload.reminders.filter(
              (apr) => apr.date === reminder.date
            ).length
        ),
      };
    case 'reminders/DELETE_REMINDER':
      return {
        ...state,
        list: state.list.filter(
          (reminder) => action.payload.reminder.date !== reminder.date
        ),
      };
    default:
      return state;
  }
}

export const remindersListSelector = (state: RootState) => state.reminders.list;
