import createRoute from 'find-my-way'
import * as petController from '../controller/pet.mjs'
import * as userController from '../controller/user.mjs'

const router = createRoute()

router.on('OPTIONS', '/*', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.end()
})

router.on('GET', '/pet', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  const result = await petController.getPets()
  res.end(JSON.stringify(result))
})

router.on('POST', '/user', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  const result = await userController.addNewUser(req, res)
  res.end(JSON.stringify(result))
})

router.on('POST', '/user/login', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  const result = await userController.loginUser(req, res)
  res.end(JSON.stringify(result))
})

router.on('POST', '/image/upload', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'text/html')
  const result = await petController.uploadPet(req, res)
  res.end(result)
})

export default router
