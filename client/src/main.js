import {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, withRouter} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index.js';
import {Provider, connect} from 'react-redux';
import createLogger from 'redux-logger';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import page from 'page';

import Layout from './containers/menu/layout';
import Login from './components/Login';
import {cookie} from 'react-cookie-banner';
import Student from './components/student';
import Home from './components/menu/Home';
import Score from './components/score';

const store = createStore(
  rootReducer,
  applyMiddleware(createLogger(), thunkMiddleware)
);

class Main extends Component {
  check() {
    superagent
      .get('/api/login')
      .use(noCache)
      .end((err, res) => {
        if (err) {
          page('/login');
        }
        if (res.statusCode !== 200) {
          page('/login');
        }else if (res.statusCode === 200) {
          page('/');

        }
      });

  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Layout} onEnter={this.check}>
          <IndexRoute components={Home}/>
          <Route path='index' component={Home}/>
          <Route path='students'>
            <IndexRoute component={Student}/>
          </Route>
          <Route path='score'>
            <IndexRoute component={Score}/>
          </Route>
        </Route>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;

let RootApp = connect(mapStateToProps)(withRouter(Main));

render(
  <Provider store={store}>
    <RootApp/>
  </Provider>,
  document.getElementById('app'));
