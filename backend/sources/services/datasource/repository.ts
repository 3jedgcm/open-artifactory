import dataSource from './index'
import File from '../../model/entities/File'

export default {
  files: dataSource.getRepository(File)
}
