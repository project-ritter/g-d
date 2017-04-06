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

  requestStudents() {
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
    this.requestStudents();
  }

  reportStudentCSV() {
    superagent
      .get('/api/report/student-csv')
      .end((err, res) => {
        console.log('send success');
      })
  }

  render() {
    return (
      <div className='stack-body row'>
        <a target="_blank" href={"localhost:3000/api/report/student-csv"}>导出名单</a>
        <StackList stacks={this.state.stacks}/>
      </div>
    );
  }
}
