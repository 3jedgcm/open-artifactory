import { DataSource } from 'typeorm'
import File from '../../model/entities/File'
import constants from '../../constants'
import ApiToken from '../../model/entities/ApiToken'
import Badge from '../../model/entities/Badge'
import Group from '../../model/entities/Group'

/**
 * Database access
 * @see {@link DataSource} for usage
 */
export default new DataSource({
  type: 'sqlite',
  database: constants.databaseFilePath,
  entities: [
    File,
    ApiToken,
    Badge,
    Group
  ],
  synchronize: true
})
