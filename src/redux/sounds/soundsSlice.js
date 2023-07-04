import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSoundsData } from '../api';

const initialState = {
  sounds: [],
  count: 0,
  query: '',
  filter: '',
  next: null,
  previous: null,
  loading: false,
};

export const fetchSounds = createAsyncThunk('Sounds/fetchSounds', async ({ page }, { getState }) => {
  try {
    const { query, filter } = getState().sounds;
    const response = await fetchSoundsData(query, filter, page);
    console.log(response);
    console.log(query);
    console.log(filter);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch Sounds');
  }
});

const SoundsSlice = createSlice({
  name: 'Sounds',
  initialState,
  reducers: {
    saveQuery: (state, action) => {
      state.query = action.payload;
    },
    saveFilter: (state, action) => {
      state.filter = action.payload;
    },
    selectSound: (state, action) => {
      const soundId = action.payload;
      const sound = state.sounds.find((sound) => sound.id === soundId);
      if (sound) {
        sound.selected = true; // Update the selected property to true
      }
    },
    cancelSelection: (state, action) => {
      const soundId = action.payload;
      const sound = state.sounds.find((sound) => sound.id === soundId);
      if (sound) {
        sound.selected = false; // Update the selected property to false
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSounds.pending, (state) => {
        state.loading = true;
        state.sounds = [];
      })
      .addCase(fetchSounds.fulfilled, (state, action) => {
        state.loading = false;
        state.sounds = action.payload.sounds;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(fetchSounds.rejected, (state) => {
        state.loading = false;
        state.sounds = [];
      });
  },
});

export const {
  selectSound, cancelSelection, saveFilter, saveQuery,
} = SoundsSlice.actions;
export default SoundsSlice.reducer;
