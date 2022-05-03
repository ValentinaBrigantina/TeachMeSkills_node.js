import { createReadStream, writeFile } from 'fs'
import path from 'path'

const dbUserJsonPath = path.resolve(process.cwd(), 'backend/src/services/db_user.json')

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

const writeJSONAsync = (path, data) => new Promise((resolve, reject) => {
    const buff = Buffer.from(JSON.stringify(data, null, 4))
    writeFile(path, buff, (err) => {
        err ? reject(err) : resolve()
    })
})

export const createNewUserModel = async (user) => {
    const allUsers = await readJSONAsync(dbUserJsonPath);
  
    const foundUser = allUsers.find((existingUser) => user.name === existingUser.name)
    if (foundUser) {
      return false
    }
  
    allUsers.push(user)
    await writeJSONAsync(dbUserJsonPath, allUsers)
    return true
}

export const findUserByName =  async (name) => {
    const users = await readJSONAsync(dbUserJsonPath);
    return users.find((user) => user.name === name);
}