import React, { useState, useEffect } from 'react';
import { fetchPrefectures, fetchPopulation } from './api';
import Graph from './components/Graph';

const App: React.FC = () => {
  const [prefectures, setPrefectures] = useState([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);
  const [populationData, setPopulationData] = useState([]);

  useEffect(() => {
    fetchPrefectures().then(setPrefectures);
  }, []);

  useEffect(() => {
    if (selectedPrefecture) {
      fetchPopulation(selectedPrefecture).then(setPopulationData);
    }
  }, [selectedPrefecture]);

  return (
    <div>
      <h1>都道府県別人口グラフ</h1>
      <div>
        {prefectures.map((pref) => (
          <label key={pref.prefCode}>
            <input
              type="checkbox"
              value={pref.prefCode}
              onChange={() => setSelectedPrefecture(pref.prefCode)}
            />
            {pref.prefName}
          </label>
        ))}
      </div>
      <Graph data={populationData} />
    </div>
  );
};

export default App;
