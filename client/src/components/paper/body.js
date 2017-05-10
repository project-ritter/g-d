import {Component} from 'react';

import ProgramType from './program-type';
import Difficult from './difficult';
import Distinct from './distinct';
import Validate from './validate';

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProgram: 0
    }

  }

  render() {
    return (
      <div>
        <ProgramType currentProgram={this.state.currentProgram}/>
        <Difficult currentProgram={this.state.currentProgram}/>
        <Distinct currentProgram={this.state.currentProgram}/>
        <Validate currentProgram={this.state.currentProgram}/>
      </div>
    );
  }
}
