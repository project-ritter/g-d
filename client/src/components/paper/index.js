import React, {Component} from 'react';
import rd3 from 'react-d3';

import PaperHeader from './paper-header';

let PieChart = rd3.PieChart;

export default class Paper extends Component {
  render() {
    var pieData = [{label: "Margarita", value: 20.0}, {label: "John", value: 55.0}, {label: "Tim", value: 25.0}];
    return (
      <div className="stack">

        <PaperHeader/>

        <PieChart data={pieData} width={450} height={400} radius={110} innerRadius={20} sectorBorderColor="white"
                  title="Pie Chart"/>
      </div>
    );
  }
}
