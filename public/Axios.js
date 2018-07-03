import axios from 'axios'
import Tracer from '../commons/Tracer'


module.exports.init = () => {

  // Request Interceptor
  axios.interceptors.request.use(
    (reqConfig) => {

      reqConfig = reqConfig || {}
      reqConfig.headers = reqConfig.headers || {}
      reqConfig.headers['Accept'] = 'application/json'
      reqConfig.headers['Content-Type'] = 'application/json'
      reqConfig.timeout = 30000 //TODO test timeout

      return reqConfig
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  // Response Interceptor
  axios.interceptors.response.use(
    (response) => {
      // Do something with response data
      // Tracer.i('res', response.data)
      return response
    },
    (e) => {

      if(e && e.response) {
        const status = e.response.status
        const data = e.response.data
        let message = data.message || data
        if(typeof message == 'object') message = JSON.stringify(message)

        Tracer.w('postJson catch1', message, status, data, Tracer.AXIOS)
        return Promise.reject(message) //goes to catch handler
      }
      else {
        Tracer.w('postJson catch2', e.message, e, Tracer.AXIOS) //when testing with no network, this error printed 'Error: Network Error'
        return Promise.reject(e) //goes to catch handler
      }

    }
  )

}


