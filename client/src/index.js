import React from 'react';
import {render} from 'react-dom';
import Login from './component/login/login';
import '../style/index.less';

render(
  <div>
    <Login/>
  </div>,
  document.getElementById('app')
);