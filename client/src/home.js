import React from 'react';
import {render} from 'react-dom';

import Home from './component/home';
import '../style/index.less';

render(
  <div>
    <h1>home</h1>
    <Home/>
  </div>,
  document.getElementById('home')
);