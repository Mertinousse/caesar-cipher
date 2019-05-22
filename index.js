const server = require('server')
const { post, error } = server.router
const { json } = server.reply
const cachimo = require('cachimo')

server({ security: { csrf: false } }, [
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
