import { createAction, createReducer } from 'redux-act'

const initialState = {
  notifications: null,
}

export const showNotifications = createAction('SHOW_NOTIFICATIONS')
export const hideNotifications = createAction('HIDE_NOTIFICATIONS')

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
