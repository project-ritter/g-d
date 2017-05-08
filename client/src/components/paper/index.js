import React, {Component} from 'react';

import PaperHeader from './paper-header';
import Difficult from './difficult';
import Distinct from './distinct';

export default class Paper extends Component {
  render() {


    return (
      <div className="stack">

        <PaperHeader/>
        <Difficult/>
        <Distinct/>

      </div>
    );
  }
}
