export default [
  {
    id: 1,
    parent: 0,
    level: 1,
    text: '教师后台管理系统',
    uri: '/teacher-admin-web',
    icon: 'home'
  }, {
    id: 2,
    parent: 1,
    level: 2,
    text: '管理首页',
    uri: '/index',
    icon: 'home'
  }, {
    id: 3,
    parent: 1,
    level: 2,
    text: '学生管理',
    uri: '/students',
    icon: 'user-circle'
  }, {
    id: 4,
    parent: 1,
    level: 2,
    text: '课程管理',
    uri: '/course',
    icon: 'book'
  }, {
    id: 5,
    parent: 1,
    level: 2,
    text: '成绩管理',
    uri: '/score',
    icon: 'user'
  }
];
