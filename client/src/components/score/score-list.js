import React, {Component} from 'react';

export default class ScoreList extends Component {

  render() {
    let scores = this.props.scores || [];

    return (<div className='stack-table'>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>平时</th>
          <th>其中</th>
          <th>实验</th>
          <th>期末</th>
          <th>总评</th>
          <th>备注</th>
        </tr>
        </thead>
        <tbody className='table-body'>
        {
          scores.map(({schoolNumber, name, normal, middle, exc, end, total, info}, index) => {
            return (
              <tr key={index}>
                <th>{schoolNumber}</th>
                <th>{name}</th>
                <th>{normal === 0 ? '' : normal}</th>
                <th>{middle === 0 ? '' : middle}</th>
                <th>{exc === 0 ? '' : exc}</th>
                <th>{end}</th>
                <th>{total}</th>
                <th>{info}</th>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>);
  }
}
