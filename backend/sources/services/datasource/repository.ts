import dataSource from './index'
import File from '../../model/entities/File'

/**
 * Repository based on {@link dataSource}
 */
export default {
  files: dataSource.getRepository(File)
}
