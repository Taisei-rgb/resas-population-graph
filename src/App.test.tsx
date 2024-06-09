import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './App';
import { fetchPrefectures, fetchPopulation } from './api';

jest.mock('./api');

const mockFetchPrefectures = fetchPrefectures as jest.MockedFunction<typeof fetchPrefectures>;
const mockFetchPopulation = fetchPopulation as jest.MockedFunction<typeof fetchPopulation>;

describe('App', () => {
  beforeEach(() => {
    mockFetchPrefectures.mockResolvedValue([
      { prefCode: 1, prefName: '北海道' },
      { prefCode: 13, prefName: '東京都' },
    ]);

    mockFetchPopulation.mockResolvedValue([
      { year: 2000, value: 11111 },
      { year: 2005, value: 22222 },
    ]);
  });

  it('renders without crashing', async () => {
    const { container } = render(<App />);
    await waitFor(() => expect(mockFetchPrefectures).toHaveBeenCalled());
    expect(container).toBeInTheDocument();
  });

  it('handles prefecture checkbox changes correctly', async () => {
    const { getByLabelText } = render(<App />);

    await waitFor(() => getByLabelText('東京都'));

    const checkbox = getByLabelText('東京都');
    fireEvent.click(checkbox);

    await waitFor(() => expect(mockFetchPopulation).toHaveBeenCalledWith('13', '総人口'));
  });

  it('handles type changes correctly', async () => {
    const { getByLabelText } = render(<App />);
    await waitFor(() => getByLabelText('東京都'));

    const checkbox = getByLabelText('東京都');
    fireEvent.click(checkbox);

    await waitFor(() => expect(mockFetchPopulation).toHaveBeenCalledWith('13', '総人口'));

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: '年少人口' } });

    await waitFor(() => expect(mockFetchPopulation).toHaveBeenCalledWith('13', '年少人口'));

    expect(select.value).toBe('年少人口');
  });
});
