import { createStore, combineReducers } from 'redux'
import Immutable from 'immutable'

//CREATE STORE------------------------------------------------------------
let store = null

// reducerArg can be a function (single reducer function) or
// it can be an object (for multiple reducers)
export function create(reducerArg) {
  if(typeof(reducerArg) === 'function') {
    store = createStore(reducerArg)
  }
  else {
    reducerMap = reducerArg
    store = createStore(combineReducers(getAllReducers()))
  }
  return store
}

export function createDefaultReducer(initialState) {
  //return basic reducer function
  return function(state, action) {
    const { type, payload } = action
    if( type == 'onUpdate') {
      const { handler } = payload
      return handler(state, initialState)
    }
    return initialState
  }
}


//UPDATE STORE------------------------------------------------------------
export function update(handler) {
  return store.dispatch({ type: 'onUpdate', payload: { handler } })
}

export function get(...path) {
  path = parsePath(...path)
  return store.getState().getIn(path)
}
  
export function set(...pathAndValue) {
  const { path, value } = parsePathAndValue(...pathAndValue)
  return update((state) => {
    return state.setIn(path, value)
  })
}

export function merge(...pathAndValue) {
  const { path, value } = parsePathAndValue(...pathAndValue)
  return update((state) => {
    return state.mergeIn(path, value)
  })
}

export function push(...pathToCollectionAndElement) {
  const { path:pathToCollection, value:element } = parsePathAndValue(...pathToCollectionAndElement)
  return update((state) => {
    // console.log('Store.push()', pathToCollection, element)
    var collection = state.getIn(pathToCollection)
    collection = collection.push(element)
    state = state.setIn(pathToCollection, collection)
    return state
  })
}

export function pop(...pathToCollection) {
  pathToCollection = parsePath(...pathToCollection)
  return update((state) => {
    var collection = state.getIn(pathToCollection)
    collection = collection.pop()
    state = state.setIn(pathToCollection, collection)
    return state
  })
}

export function remove(...path) {
  path = parsePath(...path)
  return update((state) => {
    state = state.removeIn(path)
    return state
  })
}

export function toggle(...path) {
  path = parsePath(...path)
  return update((state) => {
    const value = state.getIn(path)
    state = state.setIn(path, !value)
    return state
  })
}

export function reset(...path) {
  path = parsePath(...path)
  return update((state, initialState) => {
    const initialValue = initialState.getIn(path)
    state = state.setIn(path, initialValue)
    return state
  })
}

// Convert path args to array
function parsePath(...path) {
  // we accept multiple string args or 1 array arg for path
  if(path.length == 1 && Array.isArray(path[0]))// the path was given as an array
    path = path[0]
  return path
}

function parsePathAndValue(...pathAndValue) {
  var value = pathAndValue.pop() // value is last arg
  value = Immutable.fromJS(value) // always convert to Immutable objects
  
  // we accept multiple string args or 1 array arg for path
  var path = parsePath(pathAndValue)

  return {path, value}
}

//HELPERS----------------------------------------------------------------
export function asyncAction(func) {
  return (...args) => {
    return (_dispatch, _getState) => {
      return func(...args)
    }
  }
}

// dispatch(<asyncAction>)
// dispatch({ type:'count', payload:123 })
// dispatch('count', '123')
export function dispatch(...args) {
  const numArgs = args.length
  const a0 = args[0]
  const a1 = args[1]

  if(typeof a0 == 'function') {
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

/*
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
*/

//DYNAMIC REDUCERS--------------------------------------------------------
let reducerMap = null // set when creating the store, like { user: userReducer, home: homeReducer }
const dynamicReducers = {}
function getAllReducers() {
  return combineReducers({
    ...reducerMap,
    // ...dynamicReducers //why can't i do this?
  })
}

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


//DEV----------------------------------------------------------------
const IS_DEV = false
if(IS_DEV) {
  window.Immutable = Immutable
  window.store = store
  window.gs = getState
  window.Store = Store
}