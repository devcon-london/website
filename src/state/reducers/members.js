import { createAction, createReducer } from 'redux-act';
import { ActionType } from 'redux-promise-middleware'

import { DBCollections, Errors } from '../../constants'

const { db } = window

const initialState = {
  members: [],
  loading: false,
  editing: false,
  error: null,
}

export const loadMembers = createAction('LOAD_MEMBERS', (uid) => ({
  promise: new Promise((resolve, reject) => {
    db.collection(DBCollections.members).onSnapshot(({docs}) => {
      const members = docs.map(d => d.data())
      resolve(members)
    }, reject)
  })
}))

export default createReducer(
  {
    [`${loadMembers}_${ActionType.Pending}`]: state => ({
      ...state,
      loading: true,
    }),
    [`${loadMembers}_${ActionType.Fulfilled}`]: (state, members) => ({
      ...state,
      loading: false,
      members,
    }),
    [`${loadMembers}_${ActionType.Rejected}`]: state => ({
      ...state,
      loading: false,
      members: [],
      error: Errors.notAMember
    })
  },
  initialState
)