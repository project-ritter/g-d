import React, {Component} from 'react';
import superagent from 'superagent';
import InputWrapper from '../common/InputWrapper';

export default class ScoreHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: ''
    }
  }

  checkEmail() {
    let email = this.userEmail.value.trim();
    console.log(email)
    if (/\w@\w*\.\w/.test(email)) {
      this.setState({
        emailError: ''
      });
    } else {
      this.setState({
        emailError: '请输入正确的邮箱'
      });
    }
  }

  resetError() {
    this.setState({
      emailError: ''
    });
  }

  sendEmail() {
    console.log(this.userEmail.value)

    let userEmail = this.userEmail.value.trim();

    if (this.state.emailError || !userEmail) {
      return;
    }

    superagent
      .post('/api/email')
      .send({userEmail})
      .end((err) => {
        if (err) {
          throw  err;
        }
      })
  }

  render() {
    return (
      <div>
        <div className='stack-header'>
          成绩分析
        </div>
        <div className="form-horizontal email">
          <div className="form-group">

            <InputWrapper warning={this.state.emailError}>
              <div className={!this.state.emailError ? 'input-info row' : 'input-info-null row'}>
                <div className='col-xs-4 no-padding'>
                  <input type='text' className='input-form col-xs-11' placeholder='Email'
                         ref={(ref) => {
                           this.userEmail = ref;
                         }}
                         onFocus={this.resetError.bind(this)}
                         onBlur={this.checkEmail.bind(this)}/>
                </div>
                <button type="submit" className="btn btn-info"
                        onClick={this.sendEmail.bind(this)}>获取成绩分析结果
                </button>
              </div>
            </InputWrapper>

          </div>
        </div>
      </div>
    );
  }
}
