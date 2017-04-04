import React, {Component} from 'react';
import {Link} from 'react-router';

export default class BreadCrumb extends Component {
  render() {
    return (
      <div className='no-padding' id='breadcrumbs'>
        <ul className='no-padding breadcrumb'>
          <li className='no-padding'>
            <i className='ace-icon fa fa-home home-icon'></i>
            <a href={ +'/index'}>教师后台管理系统</a>
          </li>
          <li className='active'>学生管理</li>

        </ul>
      </div>
    );
  }
}
