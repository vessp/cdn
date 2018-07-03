import Immutable from 'immutable'
import * as Store from './store'

const initialState = Immutable.fromJS({
  didInit: false,
  isFetchingUser: false,
  user: null,
  list: [],
  error: null,
})

export default Store.createDefaultReducer(initialState)