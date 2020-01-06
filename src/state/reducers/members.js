import { createAction, createReducer } from 'redux-act'

import { DBCollections, DBSnapshots, Errors } from '../../constants'
import { showNotifications } from './ui'

const { db } = window

const initialState = {
  members: [],
  loading: false,
  editing: false,
  error: null,
}

export const loadMembers = createAction('MEMBERS_SNAPSHOT')
export const updateMembers = createAction('MEMBERS_UPDATE', members => (members))

export const membersSnapshot = () => {
  return dispatch => {
    if (typeof(DBSnapshots.membersUnsubscribe === 'undefined')) {
      // onSnapshot returns a function that is stored in DBSnapshots so it can be used to deregister the listener
      DBSnapshots.membersUnsubscribe = db
        .collection(DBCollections.members)
        .onSnapshot(({ docs }) => {
          // onSnapshot is "live", it will trigger everytime data is updated
          // https://firebase.google.com/docs/firestore/query-data/listen
          const members = docs.map(d => d.data())
          dispatch(updateMembers(members))
        }, () => {
          // handle error here, e.g. dispatch a notification
          dispatch(showNotifications(Errors.notAMember))
          dispatch(updateMembers([]))
        })
    }
  }
}

export default createReducer(
  {
    [`${loadMembers}`]: state => ({
      ...state,
      loading: true,
    }),
    [`${updateMembers}`]: (state, members) => ({
      ...state,
      loading: false,
      members: members,
    }),
  },
  initialState
)
