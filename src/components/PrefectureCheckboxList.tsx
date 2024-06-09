import React from 'react';
import { useState, useEffect, FC } from 'react';
import { fetchPrefectures } from '../api';
import { Prefecture, PrefectureCheckboxListProps } from '../types';

export const PrefectureCheckboxList: FC<PrefectureCheckboxListProps> = ({
  onPrefectureChange,
}) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <h2 className="pref-title">都道府県一覧</h2>
      <div className="pref-wrapper">
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
              />
              {pref.prefName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
