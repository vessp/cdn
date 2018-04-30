var exports = module.exports = {}

const WS = require('ws')
var wss = null

const onMessageHandlers = []

//WEB SOCKET--------------------------------------------------------------------------
exports.init = function(server, sessionParser) {
  wss = new WS.Server({ server })
  console.log('WSS:: Socket Server Started!')
  var userCount = 0
  wss.on('connection', (ws) => {
    userCount++

    console.log('WSS:: user connected, userCount=' + userCount)
    // yell({type:'USER_COUNT', payload:userCount})

    ws.on('close', () => {
      userCount--
      console.log('WSS:: user disconnected, userCount=' + userCount)
      // yell({type:'USER_COUNT', payload:userCount})
    })

    ws.on('message', (jparcel) => {
      const parcel = JSON.parse(jparcel) //{type: 'CHAT_MESSAGE', payload: 'hi'}
      console.log('WSS:: onmessage: ', '{type: ' + parcel.type + ', payload: ' + parcel.payload + '}')
      userFromWs(ws, (user) => {
        for(var handler of onMessageHandlers) {
          const replyFunc = (type, payload) => whisper(ws, {type, payload})
          if(typeof handler == 'object') {
            if(handler[parcel.type])
              handler[parcel.type](parcel.payload, replyFunc, user) //if handler is object
          }
          else if(typeof handler == 'function')
            handler(parcel.type, parcel.payload, replyFunc, user) //if handler is function
          else
            console.log('WSS:: unknown handle of type:', typeof handler)
        }
      })
      
    })
  })

  const userFromWs = (ws, callback) => {
    sessionParser(ws.upgradeReq, {}, () => {
      var session = ws.upgradeReq.session
      var user = session && session.passport && session.passport.user
      // console.log('socket is from user', user)
      callback(user)
    })
  }
}

const whisper = exports.whisper = (ws, parcel) => {
  try {
    ws.send(JSON.stringify(parcel))
  } catch (e) {
    console.log('WSS:: Whisper Error: ', e.message)
  }
}

//only include sendingWs if you want to exclude it from receiving the broadcast
const yell = exports.yell = (parcel, sendingWs=null) => {
  wss.clients.forEach(ws => {
    if(ws != sendingWs)
      whisper(ws, parcel)
  })
}

exports.addMessageHandler = (handler) => {
  onMessageHandlers.push(handler) //handler can be an object or function
  return {
    stop: () => onMessageHandlers.splice(onMessageHandlers.indexOf(handler), 1) //call to stop listening
  }
}
