import {Component} from 'react';
import Menu from './Menu';

export default class LeftNav extends Component {


  render() {
    let breadcrumb = this.props.leftNav || [];
    return (
      <div className='left-nav' id='leftNav'>
        <div>
          <ul>
            {
              breadcrumb.map((item, index) => {
                return (<Menu key={index}
                              {...item}
                />);
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
