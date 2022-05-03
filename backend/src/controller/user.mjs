import * as modelUser from '../model/user.mjs'
import { v4 as uuidv4 } from "uuid"
import bcrypt from 'bcrypt'
import { encryptionKeys } from '../utils/constants.mjs'
import { encrypt } from '../utils/encryptor.mjs'

const createId = () => uuidv4()

const validateBodyCredentials = (body, res, status = 400) => {
    if (!body || !body.name || !body.password) {
      res.writeHead(status)
      return {
        error: {
          status: status,
          message: 'Login and password is required.'
        }
      }
    }
  }

const parseJsonBody = request => new Promise((resolve, reject) => {
    let rawJson = ''
    request
        .on('data', (cunck) => {
            rawJson += cunck
        })
        .on('end', () => {
            try {
                if(rawJson) {
                    const requestBody =JSON.parse(rawJson)
                    resolve(requestBody)
                } else {
                    resolve(null)
                }
            } catch (err) {
                reject(err)
            }
        })
        .on('error', reject)
})

const createPasswordHash = (password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, encryptionKeys.passwordSalt, (err, hash) => {
        if (err) {
            reject(err)
        } else {
            resolve(hash)
        }
    })
})

export const addNewUser = async (req, res) => {
    const newUserBody = await parseJsonBody(req)
  
    validateBodyCredentials(newUserBody, res)
  
    newUserBody.password = await createPasswordHash(newUserBody.password)
  
    const user = {
      id: createId(),
      ...newUserBody,
    }

    const createResult = await modelUser.createNewUserModel(user)
    if (!createResult) {
      res.writeHead(409)
      return {
        error: {
          status: 409,
          message: 'User already exists.'
        }
      }
    }
  
    return user
}

export const loginUser = async (req, res) => {
    const newUserBody = await parseJsonBody(req);
    validateBodyCredentials(newUserBody, res)
    
    const user = await modelUser.findUserByName(newUserBody.name)
    if (!user) {
        res.writeHead(404)
        return {
            error: {
                status: 404,
                message: 'User not found.'
            }
        }
    }
    const currentHash = await createPasswordHash(newUserBody.password)
    if (user.password !== currentHash) {
        res.writeHead(401)
        return {
            error: {
                status: 401,
                message: 'Unauthorized.'
            }
        }
    }

  const token = encrypt({ id: user.id, exp: Date.now() })
  return { token }
}