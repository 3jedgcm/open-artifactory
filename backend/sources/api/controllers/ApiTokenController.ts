import {
  Body,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Put,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags
} from 'tsoa'
import { Controller } from '@tsoa/runtime'
import ApiTokensResponse from '../../model/httpResponses/apiToken/ApiTokensResponse'
import mapper from '../../services/mapper'
import ApiToken from '../../model/entities/ApiToken'
import ApiTokenHttpEntity from '../../model/httpEntites/apiToken/ApiTokenEntity'
import ApiTokenService from '../../services/entityServices/ApiTokenService'
import ErrorHttpResponse from '../../model/httpResponses/ErrorResponse'
import ApiTokenResponse from '../../model/httpResponses/apiToken/ApiTokenResponse'
import ApiTokenCreateHttpEntity from '../../model/httpEntites/apiToken/ApiTokenCreateEntity'
import ApiTokenCreateResponse from '../../model/httpResponses/apiToken/ApiTokenCreateResponse'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'
import ApiTokenEditHttpEntity from '../../model/httpEntites/apiToken/ApiTokenEditEntity'
import { apiTokenExample } from '../openApiExamples'
import { Id } from '../../model/httpEntites/primitivesHttpEnties'

@Response<ErrorHttpResponse>(500, 'Internal server error', {
  httpCode: 500,
  message: 'Internal server error',
  error: true,
  details: { message: 'Sample error' }
})
@Response<ErrorHttpResponse>(401, 'Unauthorized', {
  httpCode: 401,
  message: 'Unauthorized',
  error: true
})
@Security('bearer')
@Tags('Tokens')
@Route('tokens')
export class ApiTokenController extends Controller {
  /**
   * Gets API token metadata list
   * @summary Gets API token list
   */
  @SuccessResponse(200, 'API token list')
  @Example<ApiTokensResponse>({
    httpCode: 200,
    error: false,
    message: '1 api token found',
    count: 1,
    apiTokens: [apiTokenExample]
  })
  @Get()
  public async getList(): Promise<ApiTokensResponse> {
    const apiTokens = mapper.mapArray(await ApiTokenService.getList(), ApiToken, ApiTokenHttpEntity)
    return {
      httpCode: 200,
      error: false,
      message: apiTokens.length > 0
        ? `${apiTokens.length} api token${apiTokens.length === 1 ? '' : 's'} found`
        : 'No api token found',
      count: apiTokens.length,
      apiTokens
    }
  }

  /**
   * Gets API token metadata by id
   * @summary Gets API token
   * @param id token id to get
   */
  @SuccessResponse(200, 'API token')
  @Example<ApiTokenResponse>({
    httpCode: 200,
    error: false,
    message: '#1 api token named : API key for CI',
    apiToken: apiTokenExample
  })
  @Response<ErrorHttpResponse>(422, 'Validation failed error', {
    httpCode: 422,
    message: 'Validation failed',
    error: true,
    details: {
      field: {
        message: 'Validation message',
        value: 'Bad value'
      }
    }
  })
  @Get('{id}')
  public async get(@Path() id: Id): Promise<ApiTokenResponse> {
    const apiToken = mapper.map(await ApiTokenService.get(id), ApiToken, ApiTokenHttpEntity)
    return {
      httpCode: 200,
      error: false,
      message: `#${apiToken.id} api token named : ${apiToken.name}`,
      apiToken
    }
  }

  /**
   * Generates API token
   * @summary Generates API token
   * @param tokenRequest token generation parameters
   */
  @SuccessResponse(201, 'Created API token')
  @Example<ApiTokenCreateResponse>({
    httpCode: 200,
    error: false,
    message: '#1 api token generated',
    apiToken: apiTokenExample,
    bearerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  })
  @Response<ErrorHttpResponse>(422, 'Validation failed error', {
    httpCode: 422,
    message: 'Validation failed',
    error: true,
    details: {
      field: {
        message: 'Validation message',
        value: 'Bad value'
      }
    }
  })
  @Post()
  public async generate(@Body() tokenRequest: ApiTokenCreateHttpEntity)
    : Promise<ApiTokenCreateResponse> {
    const apiToken = mapper.map(tokenRequest, ApiTokenCreateHttpEntity, ApiToken)
    if (!apiToken.isValid) {
      throw new OpenArtifactoryError(422, '\'expireAt\' date must be after current date')
    }

    const result = await ApiTokenService.generate(apiToken)

    return {
      httpCode: 201,
      error: false,
      message: `#${result.apiToken.id} api token generated`,
      bearerToken: result.bearerToken,
      apiToken: mapper.map(result.apiToken, ApiToken, ApiTokenHttpEntity)
    }
  }

  /**
   * Update API token metadata
   * @summary Edits API token
   * @param id token id to edit
   * @param tokenUpdate token metadata to set
   */
  @SuccessResponse(200, 'Updated API token')
  @Example<ApiTokenResponse>({
    httpCode: 200,
    error: false,
    message: '#1 api token updated',
    apiToken: apiTokenExample
  })
  @Response<ErrorHttpResponse>(422, 'Validation failed error', {
    httpCode: 422,
    message: 'Validation failed',
    error: true,
    details: {
      field: {
        message: 'Validation message',
        value: 'Bad value'
      }
    }
  })
  @Put('{id}')
  public async update(@Path() id: Id, @Body() tokenUpdate: ApiTokenEditHttpEntity)
    : Promise<ApiTokenResponse> {
    const apiToken = mapper.map(tokenUpdate, ApiTokenCreateHttpEntity, ApiToken)
    apiToken.id = id
    const result = mapper.map(await ApiTokenService.edit(apiToken), ApiToken, ApiTokenHttpEntity)

    return {
      httpCode: 200,
      error: false,
      message: `#${result.id} api token updated`,
      apiToken: result
    }
  }

  /**
   * Revokes API token
   * @summary Revokes API token
   * @param id token id to revoke
   */
  @SuccessResponse(200, 'Deleted API token')
  @Example<ApiTokenResponse>({
    httpCode: 200,
    error: false,
    message: '#1 api token deleted',
    apiToken: apiTokenExample
  })
  @Delete('{id}')
  public async revoke(@Path() id: Id): Promise<ApiTokenResponse> {
    const apiToken = mapper.map(await ApiTokenService.revoke(id), ApiToken, ApiTokenHttpEntity)

    return {
      httpCode: 200,
      error: false,
      message: `#${apiToken.id} api token deleted`,
      apiToken
    }
  }
}
