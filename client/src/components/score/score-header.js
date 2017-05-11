import React, {Component} from 'react';

export default class ScoreHeader extends Component {
  render() {
    return (
      <div>
        <div className='stack-header'>
          成绩分析
        </div>
        <div className="form-horizontal email">
          <div className="form-group">

            <div className="col-sm-5">
              <input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>

            </div>
            <button type="submit" className="btn btn-info">获取成绩分析结果</button>

          </div>
        </div>
      </div>
    );
  }
}
