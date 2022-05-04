import { createReadStream, createWriteStream } from 'fs'
import path from'path'
import * as petModel from '../model/pet.mjs'
import fs from 'fs/promises'
import parseJsonBody from '../utils/parseJsonBody.mjs'
import { v4 as uuid } from 'uuid'

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

export const uploadPet = (req, res) => new Promise((resolve, reject) => {
    const form = petModel.upload()
    form.parse(req, async (err, { petName }, { multipleFiles }) => {
        const petData = {
            "name": petName,
            "image": multipleFiles.newFilename,
            "id": uuid()
        }
        if (err) {
            return reject(err)
        }
        await petModel.addNewPet(petData)
        const success = await fs.readFile('./frontend/success.html')
        resolve(success.toString())
    })
})
