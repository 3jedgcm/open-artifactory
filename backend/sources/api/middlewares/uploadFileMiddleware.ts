import fileUpload from 'express-fileupload'
import constants from '../../constants'

export default fileUpload({
  limits: { fileSize: constants.maxFileSize },
  createParentPath: true
})
