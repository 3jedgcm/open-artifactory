import { DataSource } from 'typeorm'
import File from '../entities/File'

const databaseName = process.env.DATABASE_NAME ?? 'open-artifactory.db'

const dataSource = new DataSource({
  type: 'sqlite',
  database: databaseName,
  entities: [
    File,
  ],
  synchronize: true,
})

export default dataSource
