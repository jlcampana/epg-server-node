const { Logger } = require('./server/logger')
const log = new Logger('epg-server')
const { config } = require('dotenv')
config() //Injecting variables to process.env from .env file

require('./validateConfig.js').checkEnv()

const restify = require('restify')
const { name, version } = require('../package.json')
const { router } = require('./router')
const port = process.env.PORT
const server = restify.createServer({ name, version })

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.use(pino)

router(server)

server.listen(port, () => {
  console.log(`API:${server.name} listening at ${server.url}`)
})
