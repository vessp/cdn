import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'
import Immutable from 'immutable'

import appReducer from './reducer'

let store = null
const dynamicReducers = {}

function getAllReducers() {
  return combineReducers({
    app: appReducer,
    // ...dynamicReducers //why can't i do this?
  })
}

//CREATE STORE------------------------------------------------------------

export function createAppStore() {
  store = createStore(getAllReducers(), {}, applyMiddleware(thunkMiddleware, promiseMiddleware))
  return store
}

//DYNAMIC REDUCERS--------------------------------------------------------

export function addDynamicReducer(name, reducer) {
  if(dynamicReducers[name])
    console.warn('addDynamicReducer(): warning dynamic reducer with name ' + name + ' already exists')

  dynamicReducers[name] = reducer
  store.replaceReducer(getAllReducers())
}

export function removeDynamicReducer(name) {
  if(!dynamicReducers[name])
    console.warn('removeDynamicReducer(): warning dynamic reducer with name ' + name + ' does not exists')

  // delete dynamicReducers[name]
  // when i deleted the reducer, redux printed an error in the console
  // so instead of completely deleting the reducer, i will just clear it
  dynamicReducers[name] = (state) => Immutable.Map({})
  store.replaceReducer(getAllReducers())
}

//HELPERS----------------------------------------------------------------

export function asyncAction(func) {
  return (...args) => {
    return (_dispatch, _getState) => {
      return func(...args)
    }
  }
}

export function dispatch(...args) {
  const numArgs = args.length
  const a0 = args[0]
  const a1 = args[1]

  // console.log(args.map(a => typeof a), args)

  if(typeof a0 == 'function') {
    // console.assert(numArgs==1, 'unexpected dispatch args')
    if(numArgs != 1)
      console.log('store warning, function, numArgs should be 1 but was ' + numArgs)
    return store.dispatch(a0) //a0 is an action
  }
  else if(typeof a0 == 'object') {
    if(numArgs != 1)
      console.log('store warning, object, numArgs should be 1 but was ' + numArgs)
    return store.dispatch(a0)//should be {type:type, payload:payload} object
  }
  else if(typeof a0 == 'string') {
    const type = a0
    if(numArgs == 1) {
      return store.dispatch({type:type})
    }
    else {
      let payload = args[numArgs-1]
      //loop through the args building up the payload object
      for(let i=numArgs-2; i>=1; i--) {
        // console.assert(typeof args[i] == 'string', 'unexpected dispatch args')
        payload = {[args[i]]:payload}
      }
      return store.dispatch({type:type, payload:payload})
    }
  }
  else {
    throw new Error('unexpected dispatch args')
  }
}

export function tightenDispatch(...tighteningArgs) {
  return (...dispatchArgs) => {
    if(dispatchArgs.length == 1 && (typeof dispatchArgs[0] == 'function' || typeof dispatchArgs[0] == 'string'))
      return dispatch(...dispatchArgs)
    else
      return dispatch(...tighteningArgs, ...dispatchArgs)
  }
}

// export function directDispatch(type, payload) {
//   return store.dispatch({type:type, payload:payload})
// }

// export function tightenDirectDispatch(type) {
//   return (payload) => {
//     return directDispatch(type, payload)
//   }
// }

//remove key by key list
export function repeal(...keys) {
  return store.dispatch({type:'handleRepeal', payload:keys})
}

//push into collection
export function push(...pathToCollectionAndElement) {
  const element = pathToCollectionAndElement.pop() //element is last arg
  const pathToCollection = pathToCollectionAndElement
  return store.dispatch({ type: 'handlePush', payload: {pathToCollection, element} })
}

export function pop(...keys) {
  return store.dispatch({type:'handlePop', payload:keys})
}

export function getState(reducerName, ...getInArgs) {
  const state = store.getState()

  if(reducerName && !state[reducerName])
    console.warn('reducer with name "' + reducerName + '" does not exist')

  if(reducerName && getInArgs && getInArgs.length > 0)
    return state[reducerName].getIn(getInArgs)
  else if(reducerName)
    return state[reducerName]
  else
    return state
}

export function handleSend(state, payload) {
  // console.log('----------------')
  // console.log('>send', state.toJS())
  // console.log('  payload', payload)
  state = state.withMutations(_state => myDeepMapMerge(_state, Immutable.fromJS(payload)))
  // console.log('  <result', state.toJS())
  return state

  function myDeepMapMerge(a,b) {
    // console.log('b', b, b.toJS?b.toJS():'')

    b.forEach((valB,key) => {
      const valA = a.get(key)
      if(!a.has(key) || !valA || valB == null) {
        // console.log('  ' + key + ' case1')
        a = a.set(key, Immutable.fromJS(valB))
      }
      else if(!isMergeable(valA) || !isMergeable(valB)) {
        // console.log('  ' + key + ' case2')
        a = a.set(key, Immutable.fromJS(valB))
      }
      else {
        // console.log('  ' + key + ' case3')
        a = a.mergeIn([key], myDeepMapMerge(a.get(key), valB))
      }
    })
    return a
  }

  function isMergeable(o) {
    return Immutable.Map.isMap(o) && !Immutable.OrderedMap.isOrderedMap(o)
  }
}

window.gs = getState

export default {
  addDynamicReducer, removeDynamicReducer,
  asyncAction,
  dispatch, tightenDispatch, getState, handleSend, 
}