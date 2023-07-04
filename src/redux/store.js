import { configureStore } from '@reduxjs/toolkit';
import soundsReducer from './sounds/soundsSlice';

const store = configureStore({
  reducer: {
    sounds: soundsReducer,
  },
});

export default store;
