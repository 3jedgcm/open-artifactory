import { v4 } from 'uuid'
import { hashSync } from 'bcrypt'
import { QueryRunner } from 'typeorm'
import ApiToken from '../../model/entities/ApiToken'
import constants from '../../constants'
import repository from '../datasource/repository'
import datasource from '../datasource'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'
// eslint-disable-next-line import/no-cycle
import SecurityService from '../security/SecurityService'

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
   * @throws {@link OpenArtifactoryError} if not found
   */
  public static async get(id: number): Promise<ApiToken> {
    const apiToken = await repository.apiTokens.findOneBy({ id })
    if (apiToken) {
      return apiToken
    }

    throw new OpenArtifactoryError(404, `#${id} API Token not found`)
  }

  /**
   * Generates API token and bearer token
   * @param newApiToken parameters to generate
   * @throws {@link OpenArtifactoryError} if error occur
   */
  public static async generate(newApiToken: ApiToken)
    : Promise<{ bearerToken: string, apiToken: ApiToken }> {
    let queryRunner!: QueryRunner
    let apiToken

    try {
      const key = v4()

      apiToken = repository.apiTokens.create()
      apiToken.expireAt = newApiToken.expireAt
      apiToken.name = newApiToken.name
      apiToken.comment = newApiToken.comment
      apiToken.hash = hashSync(key, constants.saltRounds)

      queryRunner = datasource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      apiToken = await repository.apiTokens.save(apiToken)
      const jwt = SecurityService.generateJwtToken(false, {
        isApiToken: true,
        key,
        id: apiToken.id
      }, apiToken.expireAt)

      await queryRunner.commitTransaction()

      return {
        bearerToken: jwt.jwtToken,
        apiToken
      }
    } catch (error) {
      if (queryRunner && queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction()
      }

      throw new OpenArtifactoryError(
        500,
        'An errors occur during api token creation',
        error
      )
    }
  }

  /**
   * Edits API token metadata
   * @param tokenUpdate metadata to update
   * @throws {@link OpenArtifactoryError} if not found
   */
  public static async edit(tokenUpdate: ApiToken): Promise<ApiToken> {
    const apiToken = await this.get(tokenUpdate.id)

    apiToken.name = tokenUpdate.name
    apiToken.comment = tokenUpdate.comment

    return repository.apiTokens.save(apiToken)
  }

  /**
   * Revokes API token metadata
   * @param id token id to delete
   * @throws {@link OpenArtifactoryError} if not found
   */
  public static async revoke(id: number) {
    const apiToken = await this.get(id)
    return repository.apiTokens.remove(apiToken)
  }
}
