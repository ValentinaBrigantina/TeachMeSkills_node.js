import 'dotenv/config'
import http from 'http'
import serveStatic from 'serve-static'
import path from 'path'
import router from './src/services/router.mjs'

const port = process.env.PORT || 4000
// const port = 4000

const frontendPath = path.resolve(process.cwd(), 'frontend')
const serve = serveStatic(frontendPath, {
    index: ['index.html']
})

const server = http.createServer((req, res) => {
    serve(req, res, () => {
        router.lookup(req, res)
    })
})

server.listen(port, '127.0.0.1', () => {
    console.log(`Server listining for 127.0.0.1:${port}`)
})
