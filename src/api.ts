const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://opendata.resas-portal.go.jp';

export const fetchPrefectures = async () => {
  const response = await fetch(`${BASE_URL}/api/v1/prefectures`, {
    headers: { 'X-API-KEY': API_KEY },
  });
  const data = await response.json();
  return data.result;
};

export const fetchPopulation = async (prefCode: string) => {
  const response = await fetch(`${BASE_URL}/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
    headers: { 'X-API-KEY': API_KEY },
  });
  const data = await response.json();
  return data.result.data[0].data;
};
