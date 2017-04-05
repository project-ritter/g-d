import {Component} from 'react';

export default class Title extends Component {
  render() {
    return (
      <div id='login-title'>
        <h1 className='text-center'>
          <i className='fa fa-leaf'></i>
          <span className='red'>TWARS</span>
          <span className='grey'>后台管理</span>
        </h1>
        <div className='blue text-center'>
          © 思沃学院
        </div>
      </div>
    );
  }
}
