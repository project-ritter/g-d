import {Component} from 'react';
import {InputWrapper} from '../common';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import superagent from 'superagent';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accountError: '',
      passwordError: '',
      account: '',
      password: ''
    };
  }

  handleAccount() {
    if (this.account.value.trim) {
      this.setState({
        account: this.account.value.trim()
      });
    } else {
      this.setState({accountError: '用户名不能为空'});
    }
  }

  updateAccountError() {
    this.setState({accountError: ''});
  }

  handlePassword() {
    if (this.password.value.trim()) {
      this.setState({
        password: this.password.value.trim()
      });
    } else {
      this.setState({passwordError: '用户名不能为空'});
    }
  }

  updatePasswordError() {
    this.setState({passwordError: ''});
  }

  checkLogin() {
    if (this.state.account && this.state.password) {
      superagent
        .post('/api/login')
        .send({
          name: this.state.account,
          password: this.state.password
        })
        .end((err, res) => {
          if (res.statusCode !== 200) {
            console.log('fail')
          }
        })
    } else {
      this.setState({
        accountError: '用户名或密码有误',
        passwordError: '用户名或密码有误'
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
            <InputWrapper warning={this.state.accountError}>
              <div className={!this.state.accountError ? 'input-info row' : 'input-info-null row'}>
                <div className='col-xs-11 no-padding'>
                  <input type='text' className='input-form col-xs-12' placeholder='用户名'
                         ref={(ref) => {
                           this.account = ref;
                         }}
                         onFocus={this.updateAccountError.bind(this)}
                         onBlur={this.handleAccount.bind(this)}/>
                </div>
                <i className='input-icon fa fa-user col-xs-1 text-center'> </i>
              </div>
            </InputWrapper>
            <InputWrapper warning={this.state.passwordError}>
              <div className={!this.state.passwordError ? 'input-info row' : 'input-info-null row'}>
                <div className='col-xs-11 no-padding'>
                  <input type='password' className='input-form col-xs-12' placeholder='密码'
                         ref={(ref) => {
                           this.password = ref;
                         }}
                         onFocus={this.updatePasswordError.bind(this)}
                         onBlur={this.handlePassword.bind(this)}/>
                </div>
                <i className='input-icon fa fa-lock col-xs-1 text-center'> </i>
              </div>
            </InputWrapper>

            <div className='form-footer row'>
              <div className='checkbox col-xs-8'>
                <label>
                  <input type='checkbox'/> 记住我
                </label>
              </div>
              <div className='col-xs-4'>
                <button type='button' className='pull-right btn btn-sm btn-primary'
                        onClick={this.checkLogin.bind(this)}>
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

export default connect(() => {
  return {};
})(withRouter(LoginForm));
