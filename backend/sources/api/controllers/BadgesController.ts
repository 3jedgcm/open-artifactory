import {
  Body,
  Controller,
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
import { Id } from '../../model/httpEntites/primitivesHttpEnties'
import mapper from '../../services/mapper'
import ErrorHttpResponse from '../../model/httpResponses/ErrorResponse'
import { badgeExample } from '../openApiExamples'
import BadgesHttpResponse from '../../model/httpResponses/badge/BadgesHttpResponse'
import BadgeHttpResponse from '../../model/httpResponses/badge/BadgeHttpResponse'
import BadgeService from '../../services/entityServices/BadgeService'
import BadgeHttpEntity from '../../model/httpEntites/badge/BadgeHttpEntity'
import BadgeCreateUpdateHttpEntity from '../../model/httpEntites/badge/BadgeCreateUpdateHttpEntity'
import Badge from '../../model/entities/Badge'

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
@Tags('Badges')
@Route('badges')
export class BadgesController extends Controller {
  /**
   * Gets badges list
   * @summary Gets badges
   */
  @SuccessResponse(200, 'Badge list')
  @Example<BadgesHttpResponse>({
    httpCode: 200,
    error: false,
    message: '3 badges found',
    count: 3,
    badges: [badgeExample, badgeExample, badgeExample]
  })
  @Get()
  public async getList(): Promise<BadgesHttpResponse> {
    const badges = mapper.mapArray(await BadgeService.getList(), Badge, BadgeHttpEntity)
    return {
      httpCode: 200,
      error: false,
      count: badges.length,
      message: badges.length > 0
        ? `${badges.length} badge${badges.length === 1 ? '' : 's'} found`
        : 'No badge found',
      badges
    }
  }

  /**
   * Gets badge metadata by id
   * @summary Gets badge
   * @param id badge id to get
   */
  @SuccessResponse(200, 'Badge')
  @Example<BadgeHttpResponse>({
    httpCode: 200,
    error: false,
    message: '#1 badge named : badge',
    badge: badgeExample
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
  @Response<ErrorHttpResponse>(404, 'Unknown id', {
    httpCode: 404,
    message: '#1 badge not found',
    error: true
  })
  @Get('{id}')
  public async get(@Path() id: Id): Promise<BadgeHttpResponse> {
    const badge = mapper.map(await BadgeService.get(id), Badge, BadgeHttpEntity)
    return {
      httpCode: 200,
      error: true,
      message: `#${badge.id} badge named : ${badge.name}`,
      badge
    }
  }

  /**
   * Creates badge
   * @summary Creates badge
   * @param toCreate badge data
   */
  @SuccessResponse(200, 'Created badge')
  @Example<BadgeHttpResponse>({
    httpCode: 200,
    error: false,
    message: '#1 badge created',
    badge: badgeExample
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
  public async create(@Body() toCreate: BadgeCreateUpdateHttpEntity): Promise<BadgeHttpResponse> {
    const toCreatebadge = mapper.map(toCreate, BadgeCreateUpdateHttpEntity, Badge)

    const badge = mapper.map(await BadgeService.create(toCreatebadge), Badge, BadgeHttpEntity)
    return {
      httpCode: 200,
      error: true,
      message: `#${badge.id} badge created`,
      badge
    }
  }

  /**
   * Updates badge
   * @summary Updates badge
   * @param id badge id to edit
   * @param toUpdate badge data
   */
  @SuccessResponse(200, 'Updated badge')
  @Example<BadgeHttpResponse>({
    httpCode: 200,
    error: false,
    message: '#1 badge updated',
    badge: badgeExample
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
  @Response<ErrorHttpResponse>(404, 'Unknown id', {
    httpCode: 404,
    message: '#1 badge not found',
    error: true
  })
  @Put('{id}')
  public async update(@Path() id: Id, @Body() toUpdate: BadgeCreateUpdateHttpEntity)
    : Promise<BadgeHttpResponse> {
    const toUpdatebadge = mapper.map(toUpdate, BadgeCreateUpdateHttpEntity, Badge)
    toUpdatebadge.id = id

    const badge = mapper.map(await BadgeService.update(toUpdatebadge), Badge, BadgeHttpEntity)
    return {
      httpCode: 200,
      error: true,
      message: `#${badge.id} badge updated`,
      badge
    }
  }

  /**
   * Deletes badge
   * @summary Deletes badge
   * @param id badge id to delete
   */
  @SuccessResponse(200, 'Deleted badge')
  @Example<BadgeHttpResponse>({
    httpCode: 200,
    error: false,
    message: '#1 badge deleted',
    badge: badgeExample
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
  @Response<ErrorHttpResponse>(404, 'Unknown id', {
    httpCode: 404,
    message: '#1 badge not found',
    error: true
  })
  @Delete('{id}')
  public async delete(@Path() id: Id): Promise<BadgeHttpResponse> {
    const badge = mapper.map(await BadgeService.delete(id), Badge, BadgeHttpEntity)
    return {
      httpCode: 200,
      error: true,
      message: `#${badge.id} badge deleted`,
      badge
    }
  }
}
