import React, {Component} from 'react';
import Title from './title';
import LoginForm from './login-form';
import '../../../style/index.less';

export default class Login extends Component {
  render() {
    return <div>
      <Title />
      <LoginForm />
    </div>
  }
}