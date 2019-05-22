import { combineReducers } from 'redux'

import user from './user'
import ui from './ui'
import members from './members'

export default combineReducers({
  user,
  ui,
  members,
})
