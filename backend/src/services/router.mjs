import createRoute from 'find-my-way'
import * as petController from '../controller/pet.mjs'
import * as userController from '../controller/user.mjs'

const router = createRoute()

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

router.on('POST', '/image/upload', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  const result = petController.uploadPet(req, res)
  res.end(JSON.stringify({
    code: 200
  }))
})

export default router
