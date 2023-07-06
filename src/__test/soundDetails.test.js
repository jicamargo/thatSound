import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route } from 'react-router-dom';
import SoundDetails from '../components/SoundDetails';

describe('SoundDetails component', () => {
  test('renders loading state correctly', () => {
    const store = configureStore({
      reducer: {
        soundDetails: () => ({
          loading: true,
          soundDetails: null,
          error: null,
        }),
      },
    });

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SoundDetails />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText(/loading sound details/i)).toBeInTheDocument();
    expect(queryByText(/error/i)).toBeNull();
    expect(queryByText(/please select a sound to have details/i)).toBeNull();
  });

    test('renders "please select a sound" state correctly', () => {
    const store = configureStore({
      reducer: {
        soundDetails: () => ({
          loading: false,
          soundDetails: null,
          error: null,
        }),
      },
    });

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SoundDetails />
        </MemoryRouter>
      </Provider>,
    );

    expect(queryByText(/loading sound details/i)).toBeNull();
    expect(queryByText(/error/i)).toBeNull();
    expect(getByText(/please select a sound to have details/i)).toBeInTheDocument();
  });

  test('renders sound details correctly', () => {
    const soundDetailsData = {
      id: 1,
      name: 'Sound 1',
      description: 'Sound 1 description',
      duration: 10.5,
      samplerate: 44100,
      avg_rating: 4.5,
      num_ratings: 10,
      tags: ['tag1', 'tag2'],
      images: {
        waveform_l: 'waveform_l.jpg',
      },
      previews: {
        'preview-hq-mp3': 'preview-hq-mp3.mp3',
        'preview-hq-ogg': 'preview-hq-ogg.ogg',
      },
      download: 'download.mp3',
    };

    const store = configureStore({
      reducer: {
        soundDetails: () => ({
          loading: false,
          soundDetails: soundDetailsData,
          error: null,
        }),
      },
    });

    const { getByText, queryByText, getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SoundDetails />
        </MemoryRouter>
      </Provider>,
    );

    expect(queryByText(/loading sound details/i)).toBeNull();
    expect(queryByText(/error/i)).toBeNull();
    expect(queryByText(/please select a sound to have details/i)).toBeNull();
    expect(getByText(/Sound 1 description/i)).toBeInTheDocument();
    expect(getByText(/Duration:/i)).toBeInTheDocument();
    expect(getByText(/10 ratings/i)).toBeInTheDocument();
    expect(getByText(/tag1/i)).toBeInTheDocument();
    expect(getByText(/tag2/i)).toBeInTheDocument();
  });
});
