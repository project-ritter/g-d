import {combineReducers} from 'redux';
import breadcrumb from './menu/breadcrumb';
import leftNav from './menu/left-nav';
import logout from './logout/logout';
import uri from './common/uri';
import stacks from './stacks';

const rootReducer = combineReducers({
  uri,
  leftNav,
  breadcrumb,
  logout,
  stacks
});

export default rootReducer;
