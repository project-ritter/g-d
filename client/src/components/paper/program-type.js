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
      .get('/api/program')
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

  handleClick(index) {
    if (index === this.props.currentProgram) {
      return;
    }

  }

  render() {
    return (
      <div>
        {
          this.state.programType.map((item, index) => {
            let style = index === this.props.currentProgram ? 'info' : 'default';
            return (
              <div className="col-sm-1">
                <button key={index} type="button"
                        className={"btn btn-lg btn-" + style}
                        onClick={this.handleClick.bind(this, index)}>
                  {item}
                </button>
              </div>);
          })
        }
      </div>
    );
  }
}
