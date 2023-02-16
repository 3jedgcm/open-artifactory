import { DataSource } from 'typeorm'
import File from '../../model/entities/File'
import constants from '../../constants'

/**
 * Database access
 * @see {@link DataSource} for usage
 */
export default new DataSource({
  type: 'sqlite',
  database: constants.databaseFilePath,
  entities: [
    File
  ],
  synchronize: true
})
