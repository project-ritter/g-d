import  React, {Component} from 'react';
import superagent from 'superagent';
import ErrorTip from '../common/error-tip'

export default class Login extends Component {
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
        passwordError: '用户名不能为空'
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
        .end((err, res) => {
          if (err) {
            throw  err;
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
      <div className="login">
        <div className="signinpanel">
          <div className="row">
            <div className="col-sm-12">
              <form >
                <h4 className="no-margins">登录：</h4>
                <p className="m-t-md">登录到H+后台主题UI框架</p>

                <div className="m-b">
                  <input type="text" className="form-control name" placeholder="用户名"
                         ref={(ref) => {
                           this.name = ref;
                         }}
                         onBlur={this.handleUsername.bind(this)}
                         onFocus={this.updateNameError.bind(this)}/>
                  <ErrorTip error={this.state.nameError}/>
                </div>

                <div className="m-b">
                  <input type="password" className="form-control password" placeholder="密码"
                         ref={(ref) => {
                           this.password = ref;
                         }}
                         onBlur={this.handlePassword.bind(this)}
                         onFocus={this.updatePasswordError.bind(this)}/>
                  <ErrorTip error={this.state.passwordError}/>
                </div>
              </form>
              <button className="btn btn-success btn-block" onClick={this.login.bind(this)}>登录</button>
            </div>
          </div>
          <div className="signup-footer">
            <div className="pull-left">
              &copy; Ritter
            </div>
          </div>
        </div>
      </div>
    );
  }

}
