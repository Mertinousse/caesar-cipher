const server = require('server')
const { post } = server.router
const { json } = server.reply

const cachimo = require('cachimo')

cachimo.put('key', 'value')

server({ security: { csrf: false } }, [
  post('/', ctx => json(ctx.data))
])
