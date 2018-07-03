import Immutable from 'immutable'
import * as Store from './store'

//----------------------------------------------------------------
export const init = () => {
  Store.set('didInit', true)
}

//----------------------------------------------------------------
export const fetchUser = (bar) => {
  Store.set('isFetchingUser', true)
  Api.fetchUser()
    .then(user => {
      Store.merge({user, isFetchingUser:false})
    })
    .catch(error => {
      Store.set('error', error)
    })
}