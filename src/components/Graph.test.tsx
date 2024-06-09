import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Graph } from './Graph';
import { DataPoint } from '../types';

const data: { [key: string]: DataPoint[] } = {
  北海道: [
    { year: 1960, value: 11111 },
    { year: 1965, value: 22222 },
    { year: 1970, value: 33333 },
  ],
  青森県: [
    { year: 1960, value: 44444 },
    { year: 1965, value: 55555 },
    { year: 1970, value: 66666 },
  ],
};

describe('Graph', () => {
  test('renders without crashing', () => {
    const { container } = render(<Graph data={data} selectedType="総人口" />);
    expect(container).toBeInTheDocument();
  });

  test('displays the correct title', () => {
    const { getByText } = render(<Graph data={data} selectedType="総人口" />);
    expect(getByText('人口構成')).toBeInTheDocument();
  });

  test('renders Highcharts container', () => {
    const { container } = render(<Graph data={data} selectedType="総人口" />);
    const highchartsContainer = container.querySelector('.highcharts-container');
    expect(highchartsContainer).toBeInTheDocument();
  });

  test('renders correct data points', () => {
    const { container } = render(<Graph data={data} selectedType="総人口" />);
    const dataPoints = container.querySelectorAll('.highcharts-point');
    expect(dataPoints.length).toBeGreaterThan(0);
  });
});
