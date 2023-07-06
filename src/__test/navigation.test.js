import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';

describe('Navigation', () => {
  it('should render Navigation component correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
