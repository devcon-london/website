import actionTypes from '../actions/types'

const ui = {
  notifications: null,
}

export default (state = ui, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.data,
      }

    case actionTypes.HIDE_NOTIFICATIONS:
      return {
        ...state,
        notifications: null,
      }

    default:
      return state
  }
}
