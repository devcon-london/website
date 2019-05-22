import { createAction, createReducer } from 'redux-act'

const initialState = {
  notifications: null,
}

export const showNotifications = createAction('SHOW_NOTIFICATIOMS')
export const hideNotifications = createAction('HIDE_NOTIFICATIOMS')

export default createReducer(
  {
    [showNotifications]: (state, notifications) => ({
      ...state,
      notifications,
    }),
    [hideNotifications]: state => ({
      ...state,
      notifications: null,
    }),
  },
  initialState
)
