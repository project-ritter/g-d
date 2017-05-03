import React, {Component} from 'react';
import rd3 from 'react-d3';

import PaperHeader from './paper-header';

let PieChart = rd3.PieChart;
let ScatterChart = rd3.ScatterChart;
let BarChart = rd3.BarChart;

export default class Paper extends Component {
  render() {
    var pieData = [{label: "Margarita", value: 20.0}, {label: "John", value: 55.0}, {label: "Tim", value: 25.0}];
    var scatterData = [
      {
        name: "series1",
        values: [{x: 0, y: 20}, {x: 5, y: 7}, {x: 8, y: 3}, {x: 13, y: 33}, {x: 12, y: 10}, {x: 13, y: 15}, {
          x: 24,
          y: 8
        }, {x: 25, y: 15}, {x: 16, y: 10}, {x: 16, y: 10}, {x: 19, y: 30}, {x: 14, y: 30}]
      },
      {
        name: "series2",
        values: [{x: 40, y: 30}, {x: 35, y: 37}, {x: 48, y: 37}, {x: 38, y: 33}, {x: 52, y: 60}, {x: 51, y: 55}, {
          x: 54,
          y: 48
        }, {x: 45, y: 45}, {x: 46, y: 50}, {x: 66, y: 50}, {x: 39, y: 36}, {x: 54, y: 30}]
      },
      {
        name: "series3",
        values: [{x: 80, y: 78}, {x: 71, y: 58}, {x: 78, y: 68}, {x: 81, y: 47}, {x: 72, y: 70}, {x: 70, y: 88}, {
          x: 81,
          y: 90
        }, {x: 92, y: 80}, {x: 81, y: 72}, {x: 99, y: 95}, {x: 67, y: 81}, {x: 96, y: 78}]
      }
    ];

    var barData = [
      {
        "name": "Series A",
        "values": [
          {"x": 1, "y": 91},
          {"x": 2, "y": 290},
          {"x": 3, "y": -25},
        ]
      }
    ];

    var lineData = [
      {
        name: 'series1',
        values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
        strokeWidth: 3,
        strokeDashArray: "5,5",
      },
      {
        name: 'series2',
        values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
      },
      {
        name: 'series3',
        values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
      }
    ];

    return (
      <div className="stack">

        <PaperHeader/>

        <PieChart data={pieData} width={450} height={400} radius={110} innerRadius={20} sectorBorderColor="white"
                  title="Pie Chart"/>


        <ScatterChart
          data={scatterData} width={500} height={400} title="Scatter Chart" domain={{x: [-15,], y: [-15,]}}/>

        <BarChart data={barData} width={500} height={300} title="Bar Chart" yAxisLabel="Label" xAxisLabel="Value"/>

        <LineChart
          legend={true}
          data={lineData}
          width='100%'
          height={400}
          viewBoxObject={{
            x: 0,
            y: 0,
            width: 500,
            height: 400
          }}
          title="Line Chart"
          yAxisLabel="Altitude"
          xAxisLabel="Elapsed Time (sec)"
          domain={{x: [,10], y: [-10,]}}
          gridHorizontal={true}
        />

      </div>
    );
  }
}
