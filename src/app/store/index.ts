import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { remindersReducer } from './features/reminders';
import thunk from 'redux-thunk';


export const rootReducer = combineReducers({
  reminders: remindersReducer,
});


export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;
