import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import StackList from './stack-list';
import StackEditor from './stack-editor';

export default class StackBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stacks: []
    };
  }

  requestStacks() {
    superagent
      .get('/api/students')
      .use(noCache)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({
          stacks: res.body
        });
      });
  }

  componentDidMount() {
    this.requestStacks();
  }

  render() {
    return (
      <div className='stack-body row'>
        <StackList stacks={this.state.stacks}/>
      </div>
    );
  }
}
