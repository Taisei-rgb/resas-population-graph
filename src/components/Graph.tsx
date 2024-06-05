import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { FC } from 'react';
import { DataPoint } from '../types';
import accessibility from 'highcharts/modules/accessibility';

accessibility(Highcharts);
interface Props {
  data: { [key: string]: DataPoint[] };
  selectedType: string;
}

const Graph: FC<Props> = ({ data, selectedType }) => {
  const options = {
    title: {
      text: '人口構成',
      margin: 30,
    },
    chart: {
      type: 'line',
      height: 400,
      borderRadius: 8,
      width: null,
    },
    xAxis: {
      categories: data[Object.keys(data)[0]]?.map((item) =>
        item.year.toString()
      ),
    },
    yAxis: {
      title: {
        text: '総人口 (k)',
      },
    },
    series: Object.keys(data).map((prefName) => ({
      name: prefName,
      data: data[prefName]?.map((item) => item.value),
    })),
    accessibility: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Graph;
