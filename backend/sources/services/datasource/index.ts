import { DataSource } from 'typeorm'
import File from '../../model/entities/File'
import constants from '../../constants'

export default new DataSource({
  type: 'sqlite',
  database: constants.databasePath,
  entities: [
    File
  ],
  synchronize: true
})
