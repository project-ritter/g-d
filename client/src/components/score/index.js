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
      scores: [],
      totalPage: 1,
      currentPage: 1,
      pageCount: 15
    };
  }

  requestData() {
    superagent
      .get('/api/grades')
      .query({
        currentPage: this.state.currentPage,
        pageCount: this.state.pageCount
      })
      .use(noCache)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({
          scores: res.body.items,
          totalPage: res.body.totalPage
        });
      })
  }

  componentDidMount() {
    this.requestData();
  }

  handlePage(page) {
    this.setState({
      currentPage: page
    }, () => {
      this.requestData();
    });
  }

  render() {
    return (
      <div className="stack">
        <ScoreHeader/>

        <div className="col-sm-6 no-padding">
          <ScoreList scores={this.state.scores}
                     onPageChange={this.handlePage.bind(this)}
                     totalPage={this.state.totalPage}/>
        </div>
        <div className="col-sm-6">
          <SocreAnalyse/>
        </div>
      </div>
    );
  }
}
