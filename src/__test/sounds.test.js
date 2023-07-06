import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Sounds from '../components/Sounds';

describe('Sounds component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state correctly', () => {
    const store = configureStore({
      reducer: {
        sounds: () => ({ loading: true, sounds: [] }),
      },
    });

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Sounds />
      </Provider>,
    );

    expect(getByText(/loading/i)).toBeInTheDocument();
    expect(queryByText(/no sounds available/i)).toBeNull();
  });

  test('renders no sounds available state correctly', () => {
    const store = configureStore({
      reducer: {
        sounds: () => ({ loading: false, sounds: [] }),
      },
    });

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Sounds />
      </Provider>,
    );

    expect(queryByText(/loading/i)).toBeNull();
    expect(getByText(/no sounds available/i)).toBeInTheDocument();
  });
  
  test('renders sounds correctly', () => {
    const store = configureStore({
      reducer: {
        sounds: () => ({ loading: false, 
          sounds: [
            { 
              id: 1,
              name: 'Sound 1',
              selected: false,
              description: 'Sound 1 description',
              duration: 10.5,
              samplerate: 44100,
              avg_rating: 4.5,
              num_ratings: 10,
              tags: ['tag1', 'tag2'],
            },
            { 
              id: 2,
              name: 'Sound 2',
              selected: true,
              description: 'Sound 2 description',
              duration: 5.2,
              samplerate: 48000,
              avg_rating: 3.8,
              num_ratings: 5,
              tags: ['tag3', 'tag4'],
            },
          ],
        }),
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Sounds />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText(/sound 1/i)).toBeInTheDocument();
    expect(getByText(/sound 2/i)).toBeInTheDocument();
    expect(getByText(/tag1/i)).toBeInTheDocument();
    expect(getByText(/tag3/i)).toBeInTheDocument();
  });
});
