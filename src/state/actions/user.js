import actionTypes from './types';

export function userLogin(data) {
  return {
    type: actionTypes.UserLoggedIn,
    data,
  };
}

export function userLogout() {
  return {
    type: actionTypes.UserLoggedOut,
  };
}
