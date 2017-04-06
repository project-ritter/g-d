import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import StackList from './stack-list';

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

  reportStudentCSV() {
    superagent
      .get('/api/report/student-csv')
      .use(noCache)
      .end((err, res) => {
        console.log(err)
        console.log('csv')
      })
  }

  render() {
    return (
      <div className='stack-body row'>
        <button type="button" onClick={this.reportStudentCSV.bind(this)}>导出名单</button>
        <StackList stacks={this.state.stacks}/>
      </div>
    );
  }
}
