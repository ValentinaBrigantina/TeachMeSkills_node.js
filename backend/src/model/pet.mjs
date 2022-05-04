import { createReadStream, writeFile } from 'fs'
import path from 'path'
import formidable from 'formidable'

const dbJsonPath = path.resolve(process.cwd(), 'backend/src/services/db_pets.json')

const readJSONAsync = (path) => new Promise((resolve) => {
    const readStream = createReadStream(path)
    let result = ''
    readStream
        .on('data', (chunk) => {
            result += chunk.toString()
        })
        .on('end', (chunk) => {
            if (!result) {
                resolve([])
            } else {
                resolve(JSON.parse(result))
            }
        })
})

export const fetchAllPets = () => readJSONAsync(dbJsonPath)

export const upload = () => {
    const form = formidable({
        uploadDir: `${process.cwd()}/frontend/images`,
        multiples: true,
        filename: ($, _, {originalFilename}) => `${Math.random().toString(16).slice(10)}${originalFilename}`,
      })
      return form
}