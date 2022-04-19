const { HttpError } = require('../utils/curstom-errors')
const { decrypt } = require('./json-encryption')

exports.checkAuth = (req) => {
    const { authorization } = req.headers
    if (!authorization) {
        throw new HttpError('Not auhrorized.', 401)
    }
    try {
        req.user = decrypt(authorization)
    } catch (err) {
        throw new HttpError('Forbidden.', 403)
    }
}

exports.identification = (cb) => (...args) => {
    const [req, res] = args
    const { authorization } = req.headers
    if (!authorization) {
      res.writeHead(403)
      return res.end(JSON.stringify({
        error: {
          status: 403,
          message: 'Forbidden.'
        }
      }))
    } else {
      try {
        req.user = decrypt(authorization)
      } catch (err) {
        res.writeHead(403)
        return res.end(JSON.stringify({
          error: {
            status: 403,
            message: 'Forbidden.'
          }
        }))
      }
    }
  
    return cb(...args)
}

exports.checkRole = (...requiredRoles) => (req) => {
    const currentUserRoles = req.user.roles || []
    if (!currentUserRoles.some((role) => requiredRoles.includes(role))) {
        throw new HttpError(`Forbidden. Some of ${requiredRoles.join(',')} is required.`, 403)
    }
}
