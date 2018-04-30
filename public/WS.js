const exports = module.exports = {}

// const VERBOSE_LOGGING = true
const VERBOSE_LOGGING = false

exports.newSocket = function() {
  var socket = {}

  let webSocket = null
  let numConnectFails = 0
  const onMessageHandlers = []
  const onConnectedTasks = []

  //CONNECTION------------------------------------------------------------------------------------
  const connect = () => {
    webSocket = new WebSocket((location.protocol == 'https:'?'wss:':'ws:') + '//' + location.host)

    webSocket.onopen = (event) => {
      // console.log('websocket.onopen')
      numConnectFails = 0
      while(onConnectedTasks.length > 0)
      {
        var task = onConnectedTasks.pop()
        task()
      }

      startPings()
    }
    webSocket.onclose = (event) => {
      // console.log('websocket.onclose')
      numConnectFails++

      if(numConnectFails <= 6){
        setTimeout(() => {
          console.log('WS:: attempting reconnect, try #' + numConnectFails)
          connect()
        }, 5000)
      } else {
        console.log('WS:: reconnect attempt count exceeded, please refresh the page to try again')
      }
    }
    webSocket.onmessage = (event) => {
      const jparcel = event.data
      const parcel = JSON.parse(jparcel) // parcel = {type: 'CHAT_MESSAGE', payload: 'hi'}
      if(VERBOSE_LOGGING)
        console.log('websocket.onmessage', parcel)

      for(var handler of onMessageHandlers) {
        if(typeof handler == 'object') {
          if(handler[parcel.type])
            handler[parcel.type](parcel.payload) //if handler is object
        }
        else if(typeof handler == 'function')
          handler(parcel.type, parcel.payload) //if handler is function
        else
          console.log('WS:: unknown handle of type:', typeof handler)
      }
    }
    webSocket.onerror = (event) => {
      console.log('WS:: OnError: ' + JSON.stringify(event))
    }
  }

  const ensureConnected = () => {
    if(!isConnected() && !isConnecting())
      connect()

    return isConnected()
  }

  //STATE---------------------------------------------------------------------------------------
  function isConnected() {return webSocket && webSocket.readyState == WebSocket.OPEN}
  function isDisconnected() {return !webSocket || webSocket.readyState == WebSocket.CLOSED}
  function isConnecting() {return webSocket && webSocket.readyState == WebSocket.CONNECTING}
  function isDisconnecting() {return webSocket && webSocket.readyState == WebSocket.CLOSING}

  //PINGS---------------------------------------------------------------------------------------
  var pingTimer = null
  function startPings() {
    if(pingTimer != null)
      return

    function ping() {
      if(isConnected()) {
        send('PING', null, false)
      }
      else {
        stopPings()
      }
    }
    pingTimer = setTimeout(ping, 60000)
  }

  function stopPings() {
    if(pingTimer != null) {
      clearTimeout(pingTimer)
      pingTimer = null
    }
  }

  function kickPings() {
    stopPings()
    startPings()
  }

  //--------------------------------------------------------------------------------------------
  var send = socket.send = (type, payload, queueTask=true) => {
    const task = () => {
      // console.log('WS:: sending:', type, payload)
      webSocket.send(JSON.stringify({type, payload}))
      kickPings()
    }

    if(ensureConnected())
      task()
    else if(queueTask)
      onConnectedTasks.push(task)
  }

  socket.addMessageHandler = (handler) => {
    onMessageHandlers.push(handler) //handler can be an object or function
    ensureConnected()

    return {
      stop: () => onMessageHandlers.splice(onMessageHandlers.indexOf(handler), 1) //call to stop listening
    }
  }

  socket.close = () => {
    if(webSocket) webSocket.close()
  }

  return socket
}
