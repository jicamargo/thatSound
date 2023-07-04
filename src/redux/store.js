import { configureStore } from '@reduxjs/toolkit';
import soundsReducer from './sounds/soundsSlice';
import soundDetailsSlice from './sounds/soundDetailsSlice';

const store = configureStore({
  reducer: {
    sounds: soundsReducer,
    soundDetails: soundDetailsSlice,
  },
});

export default store;
