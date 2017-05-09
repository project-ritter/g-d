import {Component} from 'react';
import {NavDropdown, MenuItem} from 'react-bootstrap';
import user from '../../images/user.jpg';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import page from 'page';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  exitUser() {
    superagent
      .get('/api/logout')
      .use(noCache)
      .end((err, res) => {
        page('/login');
      })
  }

  render() {
    return (
      <div>
        <div className='header' id='header'>
          <i className='fa fa-leaf'> </i>
          TWARS Admin
          <div className='nav-user-info pull-right'>
            <a ><font color='white'><i className='fa fa-bell'> </i></font></a>
            <img className='nav-user-photo nav-inline' src={user} alt='用户头像'/>
            <NavDropdown eventKey={1} title={"ritter"} id='basic-nav-dropdown'
                         className='menu-drop no-padding nav-inline'>
              <MenuItem eventKey={1.1}>
                <button className='btn btn-default' onClick={this.exitUser.bind(this)}>
                  <i className='fa fa-power-off nav-inline'> </i>
                  &nbsp; 退出
                </button>
              </MenuItem>
            </NavDropdown>
          </div>
        </div>
      </div>
    );
  }
}
