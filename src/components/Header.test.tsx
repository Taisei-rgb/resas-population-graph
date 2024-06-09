import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';

describe('Header', () => {
  test('renders without crashing', () => {
    const { container } = render(<Header />);
    expect(container).toBeInTheDocument();
  });

  test('displays the correct title', () => {
    const { getByText } = render(<Header />);
    expect(getByText('都道府県別人口グラフ')).toBeInTheDocument();
  });

  test('title has correct tag', () => {
    const { getByText } = render(<Header />);
    const title = getByText('都道府県別人口グラフ');
    expect(title.tagName).toBe('H1');
  });
});
