import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { PrefectureCheckboxList } from './PrefectureCheckboxList';
import '@testing-library/jest-dom';

const mockOnPrefectureChange = jest.fn();

jest.mock('../api', () => ({
  fetchPrefectures: jest.fn().mockResolvedValue([
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 13, prefName: '東京都' },
  ]),
}));

describe('PrefectureCheckboxList', () => {
  it('renders without crashing', async () => {
    const { container } = render(<PrefectureCheckboxList onPrefectureChange={mockOnPrefectureChange} />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    })
  });

  it('renders prefectures correctly', async () => {
    const { getByLabelText } = render(<PrefectureCheckboxList onPrefectureChange={mockOnPrefectureChange} />);
    await waitFor(() => {
      expect(getByLabelText('北海道')).toBeInTheDocument();
      expect(getByLabelText('東京都')).toBeInTheDocument();
    })
  });

  it('calls onPrefectureChange when checkbox is clicked', async () => {
    const { getByLabelText } = render(<PrefectureCheckboxList onPrefectureChange={mockOnPrefectureChange} />);
    await waitFor(() => {
      const checkbox = getByLabelText('東京都');
      fireEvent.click(checkbox);
      expect(mockOnPrefectureChange).toHaveBeenCalledWith('東京都', 13, true);
    })
  });
});
