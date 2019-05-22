import actionTypes from '../actions/types'

const initialState = {
  uid: null,
  displayName: null,
  photoURL: null,
  token: null,
  userObj: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UserLoggedIn:
      console.log('reducer user loggedin', action.data)
      return {
        ...initialState,
          uid: action.data.user.uid,
          displayName: action.data.user.displayName,
          photoURL: action.data.user.photoURL,
          token: action.data.token,
          userObj: action.data.user,
        }

    case actionTypes.UserLoggedOut:
      return {
        ...initialState
      }

    default:
      return state
  }
}

export default userReducer
