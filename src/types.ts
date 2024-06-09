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
}
