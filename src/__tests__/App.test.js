import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';  // Correct path from test file to App.js

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});