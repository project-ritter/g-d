import React, {Component} from 'react';

import PaperHeader from './paper-header';
import PaperBody from './body';

export default class Paper extends Component {
  render() {

    return (
      <div className="stack">

        <PaperHeader/>
        <PaperBody/>

      </div>
    );
  }
}
