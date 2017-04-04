import React, {Component} from 'react';
import Header from '../common/header';
import LeftNav from './left-nav';
import Breadcrumb from './bread-crumb';

export default class Layout extends Component {
  render() {
    return (<div id='demo'>
      <div>
        <Header/>
      </div>
      <div className='col-sm-2 no-padding'>
        <LeftNav/>
      </div>
      <div className='col-sm-10 no-padding'>
        <Breadcrumb/>
        {this.props.children}

      </div>
    </div>);
  }
}
