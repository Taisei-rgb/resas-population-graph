import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const Graph: React.FC<{ data: any[] }> = ({ data }) => {
  const options = {
    title: {
      text: '人口構成',
    },
    xAxis: {
      categories: data.map((item) => item.year),
    },
    series: [
      {
        name: '総人口',
        data: data.map((item) => item.value),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Graph;
