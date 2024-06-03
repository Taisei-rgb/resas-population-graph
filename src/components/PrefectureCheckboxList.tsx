import { useState, useEffect, FC } from 'react';
import { fetchPrefectures } from '../api';

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface Props {
  onPrefectureChange: (
    prefName: string,
    prefCode: number,
    isChecked: boolean
  ) => void;
}

const PrefectureCheckboxList: FC<Props> = ({ onPrefectureChange }) => {
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
    <div>
      {prefectures.map((pref) => (
        <label key={pref.prefCode}>
          <input
            type="checkbox"
            value={pref.prefCode}
            onChange={(e) =>
              onPrefectureChange(pref.prefName, pref.prefCode, e.target.checked)
            }
          />
          {pref.prefName}
        </label>
      ))}
    </div>
  );
};

export default PrefectureCheckboxList;
