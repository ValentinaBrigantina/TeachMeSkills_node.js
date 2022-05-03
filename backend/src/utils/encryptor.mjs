import { encryptionKeys } from './constants.mjs'
import createEncriptor from './sync_enc.mjs'

const encryptor = createEncriptor(encryptionKeys.syncEncryptor.keyword, encryptionKeys.syncEncryptor.salt)

export const encrypt = (obj) => {
    if (typeof obj !== 'object') {
        throw new Error('JSON encrypt arguments should be an object!')
    }

    return encryptor.encrypt(JSON.stringify(obj))
}

export const decrypt = (str) => {
    if (typeof str !== 'string') {
        throw new Error('JSON decrypt arguments should be a string!')
    }

    return JSON.parse(encryptor.decrypt(str))
}
