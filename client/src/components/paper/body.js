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

  updateCurrentProgram(index) {
    this.setState({
      currentProgram: index
    });

  }

  render() {
    return (
      <div>
        <div className="col-sm-12 program-type">
          <ProgramType currentProgram={this.state.currentProgram}
                       updateCurrentProgram={this.updateCurrentProgram.bind(this)}/>
        </div>
        <div>
          <Difficult currentProgram={this.state.currentProgram}/>
          <Distinct currentProgram={this.state.currentProgram}/>
          <Validate currentProgram={this.state.currentProgram}/>
        </div>

      </div>
    );
  }
}
