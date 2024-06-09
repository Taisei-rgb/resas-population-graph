import React, { useState, useEffect, FC } from 'react';
import { fetchPrefectures, fetchPopulation } from '../api';
import { Prefecture, PrefectureCheckboxListProps, DataPoint } from '../types';

export const PrefectureCheckboxList: FC<PrefectureCheckboxListProps> = ({
  onPrefectureChange,
  selectedPrefectures,
  prefectureCodes,
  selectedType,
  setSelectedPrefectures,
  setIsLoading,
  setFlashMessage,
  setFadeOut,
}) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSelectAll = async () => {
    setIsLoading(true);
    const allSelectedPrefectures: { [key: string]: DataPoint[] } = {};
    for (const prefName in prefectureCodes) {
      const prefCode = prefectureCodes[prefName];
      const data = await fetchPopulation(prefCode.toString(), selectedType);
      allSelectedPrefectures[prefName] = data;
    }
    setSelectedPrefectures(allSelectedPrefectures);
    setIsLoading(false);
    showFlashMessage('全ての都道府県が選択されました！');
  };

  const handleReset = () => {
    setSelectedPrefectures({});
    showFlashMessage('選択がリセットされました！');
  };

  const showFlashMessage = (message: string) => {
    setFadeOut(false);
    setFlashMessage(message);
    setTimeout(() => setFadeOut(true), 2500);
    setTimeout(() => setFlashMessage(null), 3000);
  };

  useEffect(() => {
    const getPrefectures = async () => {
      try {
        const data = await fetchPrefectures();
        setPrefectures(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch prefectures');
        setLoading(false);
      }
    };
    getPrefectures();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pref-container">
      <div className="pref-title-wrapper">
        <h2 className="pref-title">都道府県一覧</h2>
        <div className="button-group">
          <button onClick={handleSelectAll} className="select-all-button">全選択</button>
          <button onClick={handleReset} className="reset-button">リセット</button>
        </div>
      </div>
      <div className="pref-item-wrapper">
        {prefectures.map((pref) => (
          <div key={pref.prefCode} className="pref-item">
            <label className="pref-label">
              <input
                type="checkbox"
                value={pref.prefCode}
                onChange={(e) =>
                  onPrefectureChange(
                    pref.prefName,
                    pref.prefCode,
                    e.target.checked
                  )
                }
                className="pref-checkbox"
                checked={!!selectedPrefectures[pref.prefName]}
              />
              {pref.prefName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
