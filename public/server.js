const express = require('express')
const expressSession = require('express-session')
const RedisStore = require('connect-redis')(expressSession)
const bodyParser = require('body-parser')

var config = require('./config')
//----------------

if(config.isDevelopment) {
  if (!require('piping')('./server/server.js')) { 
    
  } else {
    startServer()
  }
}
else {
  startServer()
}

//----------------
function startServer() {
  const PORT = process.env.PORT || 3000

  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  var redisClient = require('redis').createClient(config.REDISTOGO_URL)
  var redisOptions = { 
    client: redisClient, 
    no_ready_check: true,
    // ttl: 600,
    //disableTTL: true,
    logErrors: true
  }
  const sessionStore = new RedisStore(redisOptions)

  const sessionParser = expressSession({ 
    secret: config.SESSION_SECRET, //require('crypto').randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    key: 'sid', //this is the cookie name
    cookie: { httpOnly: false, maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
  app.use(sessionParser)

  require('./server-api.js').init(app)

  const server = app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`)
  })
  
  require('./WSS.js').init(server, sessionParser)
  
  return server
}