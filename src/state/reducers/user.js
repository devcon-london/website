import { createAction, createReducer } from 'redux-act'
// import store from '../store'

const initialState = {
  uid: null,
  displayName: null,
  photoURL: null,
  token: null,
  userObj: null,
  membership: null,
}

export const [userLogin, userLogout, userMembership] = [
  'USER_LOGGED_IN',
  'USER_LOGGED_OUT',
  'USER_MEMBERSHIP',
].map(createAction)

export default createReducer(
  {
    [`${userLogin}`]: (state, action) => ({
      ...state,
      uid: action.user.uid,
      displayName: action.user.displayName,
      photoURL: action.user.photoURL,
      token: action.token,
      userObj: action.user,
    }),
    [`${userMembership}`]: (state, action) => ({
        ...state,
        membership: action,
      }),
    [`${userLogout}`]: () => ({
      ...initialState,
    }),
  },
  initialState
)
