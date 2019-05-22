import actionTypes from './types'

export function showNotifications(data) {
  return {
    type: actionTypes.SHOW_NOTIFICATIONS,
    data,
  }
}

export function hideNotifications() {
  return {
    type: actionTypes.HIDE_NOTIFICATIONS,
  }
}
