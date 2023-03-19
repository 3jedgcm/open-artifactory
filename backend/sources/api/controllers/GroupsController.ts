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
import GroupsHttpResponse from '../../model/httpResponses/group/GroupsHttpResponse'
import GroupHttpEntity from '../../model/httpEntites/group/GroupHttpEntity'
import { Id } from '../../model/httpEntites/primitivesHttpEnties'
import GroupCreateUpdateHttpEntity from '../../model/httpEntites/group/GroupCreateUpdateHttpEntity'
import GroupService from '../../services/entityServices/GroupService'
import mapper from '../../services/mapper'
import Group from '../../model/entities/Group'
import GroupHttpResponse from '../../model/httpResponses/group/GroupHttpResponse'
import ErrorHttpResponse from '../../model/httpResponses/ErrorResponse'
import { groupExample } from '../openApiExamples'

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
@Tags('Groups')
@Route('groups')
export class GroupsController extends Controller {
  /**
   * Gets group list
   * @summary Gets groups
   */
  @SuccessResponse(200, 'Group list')
  @Example<GroupsHttpResponse>({
    httpCode: 200,
    error: false,
    message: '3 groups found',
    count: 3,
    groups: [groupExample, groupExample, groupExample]
  })
  @Get()
  public async getList(): Promise<GroupsHttpResponse> {
    const groups = mapper.mapArray(await GroupService.getList(), Group, GroupHttpEntity)
    return {
      httpCode: 200,
      error: true,
      count: groups.length,
      message: groups.length > 0
        ? `${groups.length} group${groups.length === 1 ? '' : 's'} found`
        : 'No group found',
      groups
    }
  }

  /**
   * Gets group metadata by id
   * @summary Gets group
   * @param id group id to get
   */
  @SuccessResponse(200, 'Group')
  @Example<GroupHttpResponse>({
    httpCode: 200,
    error: false,
    message: '#1 group named : Group',
    group: groupExample
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
    message: '#1 group not found',
    error: true
  })
  @Get('{id}')
  public async get(@Path() id: Id): Promise<GroupHttpResponse> {
    const group = mapper.map(await GroupService.get(id), Group, GroupHttpEntity)
    return {
      httpCode: 200,
      error: true,
      message: `#${group.id} group named : ${group.name}`,
      group
    }
  }

  /**
   * Creates group
   * @summary Creates group
   * @param toCreate group data
   */
  @SuccessResponse(200, 'Created group')
  @Example<GroupHttpResponse>({
    httpCode: 200,
    error: false,
    message: '#1 group created',
    group: groupExample
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
  public async create(@Body() toCreate: GroupCreateUpdateHttpEntity): Promise<GroupHttpResponse> {
    const toCreateGroup = mapper.map(toCreate, GroupCreateUpdateHttpEntity, Group)

    const group = mapper.map(await GroupService.create(toCreateGroup), Group, GroupHttpEntity)
    return {
      httpCode: 200,
      error: true,
      message: `#${group.id} group created`,
      group
    }
  }

  /**
   * Updates group
   * @summary Updates group
   * @param id group id to edit
   * @param toUpdate group data
   */
  @SuccessResponse(200, 'Updated group')
  @Example<GroupHttpResponse>({
    httpCode: 200,
    error: false,
    message: '#1 group updated',
    group: groupExample
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
    message: '#1 group not found',
    error: true
  })
  @Put('{id}')
  public async update(@Path() id: Id, @Body() toUpdate: GroupCreateUpdateHttpEntity)
    : Promise<GroupHttpResponse> {
    const toUpdateGroup = mapper.map(toUpdate, GroupCreateUpdateHttpEntity, Group)
    toUpdateGroup.id = id

    const group = mapper.map(await GroupService.update(toUpdateGroup), Group, GroupHttpEntity)
    return {
      httpCode: 200,
      error: true,
      message: `#${group.id} group updated`,
      group
    }
  }

  /**
   * Deletes group
   * @summary Deletes group
   * @param id group id to get
   */
  @SuccessResponse(200, 'Deleted group')
  @Example<GroupHttpResponse>({
    httpCode: 200,
    error: false,
    message: '#1 group deleted',
    group: groupExample
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
    message: '#1 group not found',
    error: true
  })
  @Delete('{id}')
  public async delete(@Path() id: Id): Promise<GroupHttpResponse> {
    const group = mapper.map(await GroupService.delete(id), Group, GroupHttpEntity)
    return {
      httpCode: 200,
      error: true,
      message: `#${group.id} group deleted`,
      group
    }
  }
}
