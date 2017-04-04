import  React, {Component} from 'react';
import superagent from 'superagent';

import ErrorTip from '../common/error-tip'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      nameError: '',
      passwordError: ''
    };
  }

  handleUsername() {
    let name = this.name.value.trim();
    if (name) {
      this.setState({
        name,
        nameError: ''
      });
    } else {
      this.setState({
        nameError: '用户名不能为空'
      });
    }
  }

  handlePassword() {
    let password = this.password.value.trim();
    if (password) {
      this.setState({
        password,
        passwordError: ''
      });
    } else {
      this.setState({
        passwordError: '密码不能为空'
      });
    }
  }

  updateNameError() {
    this.setState({
      nameError: ''
    });
  }

  updatePasswordError() {
    this.setState({
      passwordError: ''
    });
  }

  login() {
    if (this.state.name && this.state.password) {
      superagent
        .post('/api/login')
        .send({
          name: this.state.name,
          password: this.state.password
        })
        .end((err, res) => {
          if (res.statusCode != 200) {
            this.setState({
              nameError: '用户名或密码不对',
              passwordError: '用户名或密码不对'
            });
          } else {

          }
        })
    } else {
      this.setState({
        nameError: '用户名不能为空',
        passwordError: '密码不能为空'
      });
    }

  }

  render() {
    return (
      <div id='login-form' className='col-md-4 col-md-offset-4 col-sm-offset-2 col-sm-8 col-xs-offset-1 col-xs-10'>
        <div className='login-main'>
          <h4 className='header'>
            <i className='fa fa-coffee'> </i>
            <span className='blue'>请输入您的信息</span>
          </h4>
          <div>
            <div className='input-info row'>
              <div className='col-xs-11 no-padding'>
                <input type='text' className='input-form col-xs-12' placeholder='用户名'
                       ref={(ref) => {
                         this.name = ref;
                       }}
                       onBlur={this.handleUsername.bind(this)}
                       onFocus={this.updateNameError.bind(this)}/>
              </div>
              <i className='input-icon fa fa-user col-xs-1 text-center'> </i>
            </div>
            <ErrorTip error={this.state.nameError}/>

            <div className='input-info row'>
              <div className='col-xs-11 no-padding'>
                <input type='password' className='input-form col-xs-12' placeholder='密码'
                       ref={(ref) => {
                         this.password = ref;
                       }}
                       onBlur={this.handlePassword.bind(this)}
                       onFocus={this.updatePasswordError.bind(this)}/>
              </div>
              <i className='input-icon fa fa-lock col-xs-1 text-center'> </i>
            </div>
            <ErrorTip error={this.state.passwordError}/>

            <div className='form-footer row'>
              <div className='checkbox col-xs-8'>
                <label>
                  <input type='checkbox'/> 记住我
                </label>
              </div>
              <div className='col-xs-4'>
                <button type='button' className='pull-right btn btn-sm btn-primary'
                        onClick={this.login.bind(this)}>
                  <i className='fa fa-key'> </i>
                  <span className='bigger-110'>登&nbsp;录</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className='footer'>

          <div className='forgot'>
            <a href='#' data-target='#signup-box' className='user-forgot-link pull-right'>
              忘记密码 &nbsp;
              <i className='ace-icon fa fa-arrow-right'> </i>
            </a>
          </div>

        </div>
      </div>
    );
  }
}

export default LoginForm;
