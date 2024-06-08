import { fetchPrefectures, fetchPopulation } from './api';
import { http } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', () => {
    return new Response(JSON.stringify({ result: [{ prefCode: 1, prefName: '北海道' }] }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear', () => {
    return new Response(JSON.stringify({
      result: {
        data: [
          {
            label: '総人口',
            data: [{ year: 2000, value: 1000 }, { year: 2005, value: 1100 }]
          }
        ]
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API', () => {
  it('fetches prefectures successfully', async () => {
    const prefectures = await fetchPrefectures();
    expect(prefectures).toEqual([{ prefCode: 1, prefName: '北海道' }]);
  });

  it('fetches population data successfully', async () => {
    const population = await fetchPopulation('1', '総人口');
    expect(population).toEqual([{ year: 2000, value: 1000 }, { year: 2005, value: 1100 }]);
  });

  it('handles error when fetching prefectures', async () => {
    server.use(
      http.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', () => {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      })
    );

    await expect(fetchPrefectures()).rejects.toThrow('Failed to fetch prefectures');
  });

  it('handles error when fetching population data', async () => {
    server.use(
      http.get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear', () => {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      })
    );

    await expect(fetchPopulation('1', '総人口')).rejects.toThrow('Failed to fetch population data');
  });
});
