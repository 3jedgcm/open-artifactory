import { DataSource } from 'typeorm'
import File from '../../model/entities/File'
import constants from '../../constants'

export default new DataSource({
  type: 'sqlite',
  database: constants.databaseName,
  entities: [
    File
  ],
  synchronize: true
})
