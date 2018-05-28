import Immutable from 'immutable'

import {dispatch, tightenDispatch, getState, asyncAction, directDispatch, repeal, push, pop} from './store'
import {getInitialState} from './reducer'

const get = (...getIn) => getState('app', ...getIn)
const send = tightenDispatch('handleSend')

//----------------------------------------------------------------
export const set = asyncAction((...args) => {
  send(...args)
})

export const toggle = asyncAction((...args) => {
  const val = get(...args)
  send(...args, !val)
})

export const clean = asyncAction((...args) => {
  dispatch('clean', args)
})

//----------------------------------------------------------------
export const init = asyncAction(() => {
  

})

//----------------------------------------------------------------
export const action1 = asyncAction((bar) => {
  send('deepObject', 'foo', bar)
})