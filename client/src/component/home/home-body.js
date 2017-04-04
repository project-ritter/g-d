import React, {Component} from 'react';

export default class HomeBody extends Component {
  render() {
    return (
      <div className="home-body">
        <div className="col-sm-1">
          <button type="button" className="btn btn-primary">学生管理</button>
        </div>
        <div className="col-sm-1">
          <button type="button" className="btn btn-primary">课程管理</button>
        </div>
        <div className="col-sm-1">
          <button type="button" className="btn btn-primary">班级管理</button>
        </div>

      </div>
    );
  }
}
