import { combineReducers } from 'redux';
import { remindersReducer } from './features/reminders';

export const rootReducer = combineReducers({
  reminders: remindersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
