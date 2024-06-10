import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { Options } from 'highcharts';
import accessibility from 'highcharts/modules/accessibility';
import { FC, useMemo } from 'react';
import { DataPoint, GraphProps } from '../types';

accessibility(Highcharts);

const generateOptions = (
  data: { [key: string]: DataPoint[] },
  selectedType: string
): Options => ({
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
    categories: data[Object.keys(data)[0]]?.map((item) => item.year.toString()),
  },
  yAxis: {
    title: {
      text: '総人口',
    },
  },
  series: Object.keys(data).map((prefName) => ({
    type: 'line',
    name: prefName,
    data: data[prefName]?.map((item) => item.value),
  })),
  accessibility: {
    enabled: false,
  },
});

export const Graph: FC<GraphProps> = ({ data, selectedType }) => {
  const options = useMemo(
    () => generateOptions(data, selectedType),
    [data, selectedType]
  );

  return (
    <section>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </section>
  );
};
