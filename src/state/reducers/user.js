import { createAction, createReducer } from 'redux-act'
// import store from '../store'

const initialState = {
  uid: null,
  displayName: null,
  photoURL: null,
  token: null,
  userObj: null,
  membership: null,
  loading: false,
  error: null,
}

export const [
  userLogin,
  userLogout,
  userNotMember,
  userLoading,
  userMembership,
] = [
  'USER_LOGGED_IN',
  'USER_LOGGED_OUT',
  'USER_NOT_MEMBER',
  'USER_LOADING',
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
      loading: false,
      userObj: action.user,
    }),
    [`${userNotMember}`]: (state, action) => ({
      ...state,
      loading: false,
      error: action,
    }),
    [`${userLoading}`]: state => ({
      ...state,
      loading: true,
    }),
    [`${userMembership}`]: (state, action) => ({
      ...state,
      membership: action,
      loading: false,
    }),
    [`${userLogout}`]: () => ({
      ...initialState,
    }),
  },
  initialState
)
