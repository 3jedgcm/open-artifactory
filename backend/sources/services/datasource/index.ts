import { DataSource } from 'typeorm'
import File from '../../model/entities/File'
import constants from '../../constants'
import ApiToken from '../../model/entities/ApiToken'

/**
 * Database access
 * @see {@link DataSource} for usage
 */
export default new DataSource({
  type: 'sqlite',
  database: constants.databaseFilePath,
  entities: [
    File,
    ApiToken
  ],
  synchronize: true
})
