module.exports = {
  User: [{
    '_id': '587f0f2586653d19297d40c2',
    name: 'ritter',
    password: '12345678'
  }],
  Student: [{
    '_id': '587f0f2586653d19297d40c3',
    number: '123456789',
    name: '张三',
    sex: '男',
    age: 20,
    province: '陕西',
    city: '西安',
    entryYear: '2016',
    email: '123@qq.com',
    phone: '13577777777',
    idNumber: '610431199901010000',
    classroom: '1303 班'
  }, {
    '_id': '587f0f2586653d19297d40c4',
    number: '123456780',
    name: '李四',
    sex: '男',
    age: 20,
    province: '陕西',
    city: '西安',
    entryYear: '2016',
    email: '123@qq.com',
    phone: '13577777778',
    idNumber: '610431199901010001',
    classroom: '1303 班'
  }, {
    '_id': '587f0f2586653d19297d40c5',
    number: '123456781',
    name: '王五',
    sex: '男',
    age: 20,
    province: '陕西',
    city: '西安',
    entryYear: '2016',
    email: '123@qq.com',
    phone: '13577777779',
    idNumber: '610431199901010002',
    classroom: '1303 班'
  }],
  Course: [{
    "_id": "58e5d85f835cee36d2caaff2",
    name: '语文',
    teacher: 'ritter-1'
  }, {
    "_id": "58e5d85f835cee36d2caaff3",
    name: '数学',
    teacher: 'ritter-2'
  }, {
    "_id": "58e5d85f835cee36d2caaff4",
    name: '英语',
    teacher: 'ritter-3'
  }, {
    "_id": "58e5d85f835cee36d2caaff5",
    name: '物理',
    teacher: 'ritter-4'
  }, {
    "_id": "58e5d85f835cee36d2caaff6",
    name: '化学',
    teacher: 'ritter-5'
  }],
  Score: [{
    student: '587f0f2586653d19297d40c5',
    course: '58e5d85f835cee36d2caaff3',
    grade: 76
  },{
    student: '587f0f2586653d19297d40c4',
    course: '58e5d85f835cee36d2caaff4',
    grade: 76
  },{
    student: '587f0f2586653d19297d40c3',
    course: '58e5d85f835cee36d2caaff5',
    grade: 76
  }]
};