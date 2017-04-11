import React, {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';

import ScoreHeader from './score-header';
import ScoreList from './score-list';
import SocreAnalyse from './score-analyse';

export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    };
  }

  componentDidMount() {
    superagent
      .get('/api/grades')
      .use(noCache)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({
          scores: res.body
        });
      })
  }

  render() {
    return (
      <div className="stack">
        <ScoreHeader/>

        <div className="col-sm-6 no-padding">
          <ScoreList scores={this.state.scores}/>
        </div>
        <div className="col-sm-6">
          <SocreAnalyse/>
        </div>
      </div>
    );
  }
}
