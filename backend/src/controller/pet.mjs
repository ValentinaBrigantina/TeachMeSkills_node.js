import { createReadStream, createWriteStream } from 'fs'
import path from'path'
import * as petModel from '../model/pet.mjs'
import fs from 'fs/promises'
import formidable from 'formidable'

const getNotFoundResponse = (res) => {
    res.writeHead(404)
    return {
        error: {
            message: "Not found",
            code: 404
        }
    }
}

export const getPets = async () => {
    const pets = await petModel.fetchAllPets()
    if (!pets) {
        return getNotFoundResponse(res)
    }
    return pets
}

export const createPet = (req, res) => new Promise((resolve, reject) => {
    const form = petModel.upload()
    form.parse(req, async (err) => {
        if (err) {
            reject(err)
        }
        const success = await fs.readFile('./frontend/success.html')
        resolve(success.toString())
    })
})