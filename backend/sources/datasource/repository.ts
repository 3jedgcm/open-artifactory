import dataSource from './index'
import File from '../entities/File'

export default {
  files: dataSource.getRepository(File),
}
