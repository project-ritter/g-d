import React, {Component} from 'react';
import Header from '../common/header';
import HomeBody from './home-body';
import '../../../style/home.less'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header/>
        <HomeBody/>
      </div>
    );
  }
}
