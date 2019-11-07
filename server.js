const express = require('express') // importing a CommonJS module
const hubsRouter = require('./hubs/hubs-router.js')
const helmet = require('helmet')
const morgan = require('morgan')
const server = express()
const mw = [express.json(), helmet(), morgan('dev'), methodLogger, addName]

// server.use(express.json())
// server.use(helmet())
// server.use(morgan('dev'))
// server.use(methodLogger)
// server.use(addName)
// server.use(lockout)
server.use('/api/hubs', hubsRouter)
server.use(mw)
server.use('/api/lock', lockout)
// server.use(lockDivThree)

server.get('/', (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : ''

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `)
})

function methodLogger(req, res, next) {
  console.log(`${req.method}`)
  next()
}

function addName(req, res, next) {
  // if exists keep the same, if not use elijah
  req.name = req.name || 'Elijah'
  next()
}

function lockout(req, res) {
  // do some validation ...
  // uh oh, Batman, no go!
  res.status(403).json({ message: 'api lockout' })
}

function lockDivThree(req, res, next) {
  const currentDate = new Date()
  if (currentDate.getSeconds() % 3 === 0) {
    res.status(403).json({ message: 'lockout cause div by 3' })
  } else {
    next()
  }
}

module.exports = server
