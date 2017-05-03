import React, {Component} from 'react';

import PaperHeader from './paper-header';
import Diffcult from './diffcult';

export default class Paper extends Component {
  render() {


    return (
      <div className="stack">

        <PaperHeader/>
        <Diffcult/>

      </div>
    );
  }
}
