import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = [thunk, promiseMiddleware]
let store = null

const getStore = () => {
  if(store) return store
  store = createStore(reducers, composeEnhancers(
    applyMiddleware(...middlewares)
  ))

  return store
}

export default getStore()
