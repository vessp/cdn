import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import {handleSend} from '../redux/store'

const isLocalhost = location.href.indexOf('localhost') != -1

const initialState = Immutable.fromJS({
  isFetchingUser: false,
  user: null,
  collection: Immutable.OrderedMap({}),
  deepObject: Immutable.Map({}),
})

export const getInitialState = (key) => {
  return key ? initialState.get(key) : initialState
}

export default handleActions({
  handleSend: (state, action) => {
    state = handleSend(state, action.payload)
    return state
  },
  handleRepeal: (state, action) => {
    // console.log('handleRemove', action)
    const keyList = action.payload
    state = state.removeIn(keyList)
    return state
  },
  handlePush: (state, action) => { //TODO move this handling into action and use send
    const {pathToCollection, element} = action.payload
    // console.log('handlePush', pathToCollection, element)
    var collection = state.getIn(pathToCollection)
    collection = collection.push(element)
    state = state.setIn(pathToCollection, collection)
    return state
  },
  handlePop: (state, action) => { //TODO move this handling into action and use send
    const pathToCollection = action.payload
    // console.log('handlePush', pathToCollection, element)
    var collection = state.getIn(pathToCollection)
    collection = collection.pop()
    state = state.setIn(pathToCollection, collection)
    return state
  },
  clean: (state, action) => {
    if(action.payload) {
      state = state.setIn(action.payload, initialState.getIn(action.payload))
      return state
    }
    return initialState
  },

  // listPush: (state, action) => {
  //   let set = state.get(action.payload)
  //   set = set.add(aid)
  //   return state.set('syncingAids', set)
  // }

}, initialState)