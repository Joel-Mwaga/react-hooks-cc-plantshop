import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';

describe('Search Plants', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve([
        { id: 1, name: 'Pothos', price: 10.99, image: 'pothos.jpg' },
        { id: 2, name: 'Snake Plant', price: 15.99, image: 'snake-plant.jpg' }
      ])
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('filters plants by name on search', async () => {
    const { queryAllByTestId, getByPlaceholderText } = render(<App />);
    
    await waitFor(() => {
      expect(queryAllByTestId('plant-item')).toHaveLength(2);
    });
    
    const searchInput = getByPlaceholderText('Type a name to search...');
    fireEvent.change(searchInput, { target: { value: 'p' } });
    
    await waitFor(() => {
      const filteredPlants = queryAllByTestId('plant-item');
      expect(filteredPlants).toHaveLength(1);
      expect(filteredPlants[0]).toHaveTextContent('Pothos');
    });
  });
});