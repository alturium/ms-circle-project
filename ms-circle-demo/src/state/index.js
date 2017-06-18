import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import calculate from './calculate'

export default combineReducers({
  router: routerReducer,
  calculate
})
