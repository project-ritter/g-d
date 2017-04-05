import superagent from 'superagent';
import constant from '../../../mixin/constant';

export const logout = () => {
  return (dispatch) => {
    superagent
      .get('/api/logout')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        if (res.statusCode === constant.httpCode.OK) {
          dispatch({
            type: 'LOGOUT'
          });
        }
      });
  };
};
