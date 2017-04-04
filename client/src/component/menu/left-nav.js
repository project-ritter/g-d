import React, {Component} from 'react';
import {Link} from 'react-router';

import '../../../style/menu.less'
export default class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigator: [
        {uri: '/student', text: '学生管理', icon: 'user'},
        {uri: '/course', text: '课程管理', icon: 'book'},
        {uri: '/class', text: '班级管理', icon: 'leaf'},
        {uri: '/score', text: '成绩管理', icon: 'leaf'}
      ]
    };
  }


  render() {
    return (
      <div className='left-nav' id='leftNav'>
        <ul>
          {
            this.state.navigator.map((item, index) => {
              return (
                <li key={index} className="menu">
                  <i className={'menu-icon fa fa-' + item.icon}></i>{item.text}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
