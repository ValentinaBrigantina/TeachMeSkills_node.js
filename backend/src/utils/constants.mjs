import { env } from 'process'

export const encryptionKeys = {
    syncEncryptor: {
        keyword: env.KEYWORD, 
        salt: env.SALT,
    },
    passwordSalt: env.PASSWORD_SALT,
}