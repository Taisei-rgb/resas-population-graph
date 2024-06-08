import { Prefecture, DataPoint } from './types';
import { API_KEY } from './env';

const BASE_URL = 'https://opendata.resas-portal.go.jp';

export const fetchPrefectures = async (): Promise<Prefecture[]> => {
  const response = await fetch(`${BASE_URL}/api/v1/prefectures`, {
    headers: { 'X-API-KEY': API_KEY },
  });
  const data = await response.json();
  return data.result;
};

export const fetchPopulation = async (
  prefCode: string,
  type: string
): Promise<DataPoint[]> => {
  const typeMap: { [key: string]: string } = {
    総人口: '総人口',
    年少人口: '年少人口',
    生産年齢人口: '生産年齢人口',
    老年人口: '老年人口',
  };

  const encodedPrefCode = encodeURIComponent(prefCode);

  const response = await fetch(
    `${BASE_URL}/api/v1/population/composition/perYear?prefCode=${encodedPrefCode}`,
    {
      headers: { 'X-API-KEY': API_KEY },
    }
  );
  const data = await response.json();

  if (!data.result || !data.result.data) {
    throw new Error('Invalid response structure');
  }

  const populationData = data.result.data.find(
    (d: any) => d.label === typeMap[type]
  );

  if (!populationData || !populationData.data) {
    throw new Error('No population data found');
  }

  return populationData.data.map((d: any) => ({
    year: d.year,
    value: d.value,
  }));
};
