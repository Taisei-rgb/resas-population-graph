import { useState, useEffect, FC } from 'react';
import Header from './components/Header';
import PrefectureCheckboxList from './components/PrefectureCheckboxList';
import Graph from './components/Graph';
import { fetchPopulation, fetchPrefectures } from './api';
import { DataPoint } from './types';

const App: FC = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<{
    [key: string]: DataPoint[];
  }>({});
  const [selectedType, setSelectedType] = useState<string>('総人口');
  const [prefectureCodes, setPrefectureCodes] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const fetchCodes = async () => {
      const prefectures = await fetchPrefectures();
      const codes = prefectures.reduce(
        (
          acc: { [key: string]: number },
          pref: { prefName: string; prefCode: number }
        ) => {
          acc[pref.prefName] = pref.prefCode;
          return acc;
        },
        {}
      );
      setPrefectureCodes(codes);
    };
    fetchCodes();
  }, []);

  const handlePrefectureChange = async (
    prefName: string,
    prefCode: number,
    isChecked: boolean
  ) => {
    if (isChecked) {
      const data = await fetchPopulation(prefCode.toString(), selectedType);
      setSelectedPrefectures((prev) => ({
        ...prev,
        [prefName]: data,
      }));
    } else {
      setSelectedPrefectures((prev) => {
        const updated = { ...prev };
        delete updated[prefName];
        return updated;
      });
    }
  };

  const handleTypeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newType = event.target.value;
    setSelectedType(newType);

    const updatedPrefectures: { [key: string]: DataPoint[] } = {};
    for (const prefName in selectedPrefectures) {
      const prefCode = prefectureCodes[prefName];
      if (prefCode) {
        const data = await fetchPopulation(prefCode.toString(), newType);
        updatedPrefectures[prefName] = data;
      }
    }
    setSelectedPrefectures(updatedPrefectures);
  };

  return (
    <div className="app-background">
      <Header />
      <div className="item-list">
        <form className="population-form">
          <select
            onChange={handleTypeChange}
            value={selectedType}
            className="population-select"
          >
            <option className="population-option" value="総人口">
              総人口
            </option>
            <option className="population-option" value="年少人口">
              年少人口
            </option>
            <option className="population-option" value="生産年齢人口">
              生産年齢人口
            </option>
            <option className="population-option" value="老年人口">
              老年人口
            </option>
          </select>
        </form>
        <PrefectureCheckboxList onPrefectureChange={handlePrefectureChange} />
        <div className="graph-container">
          <Graph data={selectedPrefectures} selectedType={selectedType} />
        </div>
      </div>
    </div>
  );
};

export default App;
