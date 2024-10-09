import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../reducer/slice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export default store;
