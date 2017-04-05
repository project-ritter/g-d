import {Component} from 'react';

export default class StackList extends Component {

  render() {
    const stacks = this.props.stacks || [];
    return (
      <div className='stack-table'>
        <table className='table table-bordered table-striped table-hover'>
          <thead>
          <tr>
            <th>学号</th>
            <th>班级</th>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>邮箱</th>
            <th>手机号</th>
            <th>身份证号</th>
            <th>省</th>
            <th>市</th>
            <th>入学年份</th>
          </tr>
          </thead>
          <tbody className='table-body'>
          {
            stacks.map(({number, classroom, name, sex, age, email, phone, idNumber, province, city, entryYear}, index) => {
              return (
                <tr key={index}>
                  <th>{number}</th>
                  <th>{classroom}</th>
                  <th>{name}</th>
                  <th>{sex}</th>
                  <th>{age}</th>
                  <th>{email}</th>
                  <th>{phone}</th>
                  <th>{idNumber}</th>
                  <th>{province}</th>
                  <th>{city}</th>
                  <th>{entryYear}</th>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}
