import { createReadStream, createWriteStream } from 'fs'
import path from'path'
import * as petModel from '../model/pet.mjs'

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

export const uploadPet = async (req, res) => {
    const pet = await petModel.upload()
    
}