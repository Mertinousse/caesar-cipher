const server = require('server')
const { post, error } = server.router
const { header, json } = server.reply
const cachimo = require('cachimo')
const cors = [
  ctx => header('Access-Control-Allow-Origin', '*'),
  ctx => header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'),
  ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
]

server({ security: { csrf: false } }, cors, [
  post('/', ctx => {
    const key = ctx.data.key

    if (!cachimo.has(key)) {
      cachimo.put(key, getRandomInt(25))
    }

    return json({ 'offset': cachimo.get(key) })
  }),
  error(ctx => {
    return json({ 'error': 'Invalid request' })
  })
])

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}
