const { env } = require('process')

exports.encryptionKeys = {
    syncEncryptor: {
        keyword: env.KEYWORD, 
        salt: env.SALT,
    },
    passwordSalt: env.PASSWORD_SALT,
}
