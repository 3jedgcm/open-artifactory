import { v4 } from 'uuid'
import { hashSync } from 'bcryptjs'
import ApiToken from '../../model/entities/ApiToken'
import constants from '../../constants'
import repository from '../dataSource/repository'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'
// eslint-disable-next-line import/no-cycle
import SecurityService from '../tools/SecurityService'

/**
 * Service to manage api token entities
 */
export default class ApiTokenService {
  /**
   * Gets API token list
   */
  public static async getList(): Promise<ApiToken[]> {
    return repository.apiTokens.find()
  }

  /**
   * Get API token by id
   * @param id token id to get
   * @param apiTokenRepository database repository to use
   * @throws {@link OpenArtifactoryError} if not found
   */
  public static async get(
    id: number,
    apiTokenRepository = repository.apiTokens
  ): Promise<ApiToken> {
    const apiToken = await apiTokenRepository.findOneBy({ id })
    if (apiToken) {
      return apiToken
    }

    throw new OpenArtifactoryError(404, `#${id} API token not found`)
  }

  /**
   * Generates API token and bearer token
   * @param newApiToken parameters to generate
   * @throws {@link OpenArtifactoryError} if error occur
   */
  public static async generate(newApiToken: ApiToken)
    : Promise<{ bearerToken: string, apiToken: ApiToken }> {
    return repository.executeTransaction(async (entityManager) => {
      const apiTokenRepository = entityManager.getRepository(ApiToken)
      const key = v4()

      let apiToken = repository.apiTokens.create()
      apiToken.expireAt = newApiToken.expireAt
      apiToken.name = newApiToken.name
      apiToken.description = newApiToken.description
      apiToken.hash = hashSync(key, constants.saltRounds)

      apiToken = await apiTokenRepository.save(apiToken)
      const jwt = SecurityService.generateJwtToken(false, {
        isApiToken: true,
        key,
        id: apiToken.id
      }, apiToken.expireAt ?? undefined)

      return {
        bearerToken: jwt.jwtToken,
        apiToken
      }
    })
  }

  /**
   * Edits API token metadata
   * @param tokenUpdate metadata to update
   * @throws {@link OpenArtifactoryError} if not found
   */
  public static async edit(tokenUpdate: ApiToken): Promise<ApiToken> {
    return repository.executeTransaction(async (entityManager) => {
      const apiTokenRepository = entityManager.getRepository(ApiToken)
      const apiToken = await this.get(tokenUpdate.id, apiTokenRepository)

      apiToken.name = tokenUpdate.name
      apiToken.description = tokenUpdate.description

      return apiTokenRepository.save(apiToken)
    })
  }

  /**
   * Revokes API token metadata
   * @param id token id to delete
   * @throws {@link OpenArtifactoryError} if not found
   */
  public static async revoke(id: number) {
    return repository.executeTransaction(async (entityManager) => {
      const apiTokenRepository = await entityManager.getRepository(ApiToken)
      const apiToken = await this.get(id, apiTokenRepository)

      await apiTokenRepository.remove(apiToken)

      return apiToken
    })
  }
}
