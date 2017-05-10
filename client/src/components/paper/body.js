import {Component} from 'react';

import Difficult from './difficult';
import Distinct from './distinct';
import Validate from './validate';

export default class Body extends Component {
  render() {
    return (
      <div>
        <Difficult/>
        <Distinct/>
        <Validate/>
      </div>
    );
  }
}
