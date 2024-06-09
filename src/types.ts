export interface DataPoint {
  year: number;
  value: number;
}

export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface GraphProps {
  data: { [key: string]: DataPoint[] };
  selectedType: string;
}

export interface PrefectureCheckboxListProps {
  onPrefectureChange: (
    prefName: string,
    prefCode: number,
    isChecked: boolean
  ) => void;
  selectedPrefectures: { [key: string]: DataPoint[] };
  prefectureCodes: { [key: string]: number };
  selectedType: string;
  setSelectedPrefectures: React.Dispatch<React.SetStateAction<{ [key: string]: DataPoint[] }>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFlashMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setFadeOut: React.Dispatch<React.SetStateAction<boolean>>;
}
