import {Component} from 'react';
import {Link} from 'react-router';

export default class BreadCrumb extends Component {
  render() {
    return (
      <div className='no-padding' id='breadcrumbs'>
        <ul className='no-padding breadcrumb'>
          <li className='no-padding'>
            <i className='ace-icon fa fa-home home-icon'></i>
            <Link to={'/index'}>教师后台管理系统</Link>
          </li>
          {
            this.props.breadcrumb.map((item, index) => {
              return (
                <li key={index} className='active'>{item.text}</li>
              );
            })
          }

        </ul>
      </div>
    );
  }
}
