import dataSource from './index'
import File from '../../model/entities/File'
import ApiToken from '../../model/entities/ApiToken'

/**
 * Repository based on {@link dataSource}
 */
export default {
  files: dataSource.getRepository(File),
  apiTokens: dataSource.getRepository(ApiToken)
}
