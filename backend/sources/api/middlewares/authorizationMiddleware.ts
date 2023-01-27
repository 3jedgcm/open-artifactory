import basicAuth from 'express-basic-auth'
import constants from '../../constants'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'

export default basicAuth({
  users: { [constants.adminLogin]: constants.adminPassword },
  unauthorizedResponse: () => {
    const unauthorizedError = new OpenArtifactoryError(401, 'Unauthorized')
    console.error(unauthorizedError)
    return unauthorizedError.httpResponse
  }
})
