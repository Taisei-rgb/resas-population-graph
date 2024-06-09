import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { PrefectureCheckboxList } from './PrefectureCheckboxList';
import '@testing-library/jest-dom';

const mockOnPrefectureChange = jest.fn();
const mockSetSelectedPrefectures = jest.fn();
const mockSetIsLoading = jest.fn();
const mockSetFlashMessage = jest.fn();
const mockSetFadeOut = jest.fn();

jest.mock('../api', () => ({
  fetchPrefectures: jest.fn().mockResolvedValue([
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 13, prefName: '東京都' },
  ]),
  fetchPopulation: jest.fn().mockResolvedValue([
    { year: 2000, value: 11111 },
    { year: 2005, value: 22222 },
  ]),
}));

const renderComponent = () => render(
  <PrefectureCheckboxList
    onPrefectureChange={mockOnPrefectureChange}
    selectedPrefectures={{}}
    prefectureCodes={{ 北海道: 1, 東京都: 13 }}
    selectedType="総人口"
    setSelectedPrefectures={mockSetSelectedPrefectures}
    setIsLoading={mockSetIsLoading}
    setFlashMessage={mockSetFlashMessage}
    setFadeOut={mockSetFadeOut}
  />
);

describe('PrefectureCheckboxList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    const { container } = renderComponent();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('renders prefectures correctly', async () => {
    const { getByLabelText } = renderComponent();
    await waitFor(() => {
      expect(getByLabelText('北海道')).toBeInTheDocument();
      expect(getByLabelText('東京都')).toBeInTheDocument();
    });
  });

  it('calls onPrefectureChange when checkbox is clicked', async () => {
    const { getByLabelText } = renderComponent();
    await waitFor(() => {
      const checkbox = getByLabelText('東京都');
      fireEvent.click(checkbox);
      expect(mockOnPrefectureChange).toHaveBeenCalledWith('東京都', 13, true);
    });
  });

  it('handles select all button correctly', async () => {
    const { getByText } = renderComponent();
    await waitFor(() => getByText('全選択'));
    const button = getByText('全選択');
    fireEvent.click(button);

    await waitFor(() => expect(mockSetIsLoading).toHaveBeenCalledWith(true));
    await waitFor(() => expect(mockSetSelectedPrefectures).toHaveBeenCalledWith({
      北海道: [{ year: 2000, value: 11111 }, { year: 2005, value: 22222 }],
      東京都: [{ year: 2000, value: 11111 }, { year: 2005, value: 22222 }],
    }));
    await waitFor(() => expect(mockSetIsLoading).toHaveBeenCalledWith(false));
    await waitFor(() => expect(mockSetFlashMessage).toHaveBeenCalledWith('全ての都道府県が選択されました！'));
  });

  it('handles reset button correctly', async () => {
    const { getByText } = renderComponent();
    await waitFor(() => getByText('リセット'));
    const button = getByText('リセット');
    fireEvent.click(button);

    await waitFor(() => expect(mockSetSelectedPrefectures).toHaveBeenCalledWith({}));
    await waitFor(() => expect(mockSetFlashMessage).toHaveBeenCalledWith('選択がリセットされました！'));
  });
});
