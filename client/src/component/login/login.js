import  React, {Component} from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="signinpanel">
          <div className="row">
            <div className="col-sm-12">
              <form >
                <h4 className="no-margins">登录：</h4>
                <p className="m-t-md">登录到H+后台主题UI框架</p>
                <input type="text" className="form-control username m-b" placeholder="用户名"/>
                <input type="password" className="form-control password m-b" placeholder="密码"/>
                <a href="">忘记密码了？</a>
                <button className="btn btn-success btn-block">登录</button>
              </form>
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
