import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  soundDetails: null,
  loading: false,
  error: null,
};

const soundDetailsSlice = createSlice({
  name: 'soundDetails',
  initialState,
  reducers: {
    updateSoundDetails: (state, action) => {
      state.soundDetails = action.payload;
    },
  },
});

export const { updateSoundDetails } = soundDetailsSlice.actions;
export default soundDetailsSlice.reducer;
