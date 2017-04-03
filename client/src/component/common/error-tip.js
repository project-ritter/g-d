import React, {Component} from 'react';

export default class ErrorTip extends Component {
  render() {
    return (
      <div className="error-tip">
        {this.props.error}
      </div>
    );
  }
}
