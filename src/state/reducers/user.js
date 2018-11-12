import actionTypes from '../actions/types';

const emptyUser = {
  uid: null,
  displayName: null,
  photoURL: null,
  token: null,
  userObj: null,
};

const userReducer = (state = emptyUser, action) => {
  switch (action.type) {
    case actionTypes.UserLoggedIn:
      console.log('reducer user loggedin', action.data);
      return Object.assign(
        {},
        {
          uid: action.data.user.uid,
          displayName: action.data.user.displayName,
          photoURL: action.data.user.photoURL,
          token: action.data.token,
          userObj: action.data.user,
        },
      );

    case actionTypes.UserLoggedOut:
      return Object.assign(
        {},
        emptyUser,
      );

    default:
      return state;
  }
};

export default userReducer;
