import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';

export default class ProgramType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programType: []
    };

  }

  componentDidMount() {
    superagent
      .get('/api/')
      .use(noCache)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({
          programType: res.body
        });
      })
  }

  render() {
    return (
      <div>
        {
          this.state.programType.map((item, index) => {
            return (<button key={index} type="button" className="btn btn-primary">{item}</button>);
          })
        }
      </div>
    );
  }
}
