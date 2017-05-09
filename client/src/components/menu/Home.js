import {Component} from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="stack">

        <div className='stack-header'>
          管理首页
        </div>

        <div className='text-center' style={{color: '#438EB9'}}>
          <h2 className="m-t-l">欢迎使用</h2>
          <h4 className="m-t-s">该系统用于对考试成绩质量定量分析，并将分析结果可视化在页面</h4>
        </div>
      </div>
    );
  }
}
