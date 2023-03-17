import Group from '../../model/entities/Group'
import repository from '../dataSource/repository'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'

/**
 * Service to manage group entities
 */
export default class GroupService {
  /**
   * Gets groups list
   */
  public static async getList(): Promise<Group[]> {
    return repository.groups.find()
  }

  /**
   * Gets group by identifier
   * @param id group identifier to get
   * @param groupRepository repository to use
   * @throws ${@link OpenArtifactoryError} if group not found
   */
  public static async get(id: number, groupRepository = repository.groups): Promise<Group> {
    const groupEntity = await groupRepository.findOneBy({ id })
    if (groupEntity) {
      return groupEntity
    }

    throw new OpenArtifactoryError(404, `#${id} group not found`)
  }

  /**
   * Creates group
   * @param toCreate group to create
   * @throws ${@link OpenArtifactoryError} if group with same name exists
   */
  public static async create(toCreate: Group): Promise<Group> {
    return repository.executeTransaction(async (entityManager) => {
      const groupRepository = entityManager.getRepository(Group)

      if (await groupRepository.findOneBy({ name: toCreate.name })) {
        throw new OpenArtifactoryError(422, `"${toCreate.name}" group already exists`)
      }

      const groupEntity = groupRepository.create()
      groupEntity.name = toCreate.name
      groupEntity.description = toCreate.description
      return groupRepository.save(groupEntity)
    })
  }

  /**
   * Updates group
   * @param toUpdate group to create
   * @throws ${@link OpenArtifactoryError} if group not found or group with same name exists
   */
  public static async update(toUpdate: Group): Promise<Group> {
    return repository.executeTransaction(async (entityManager) => {
      const groupRepository = entityManager.getRepository(Group)
      const groupEntity = await this.get(toUpdate.id, groupRepository)

      if (groupEntity.name !== toUpdate.name
        && await groupRepository.findOneBy({ name: toUpdate.name })) {
        throw new OpenArtifactoryError(422, `"${toUpdate.name}" group already exists`)
      }

      groupEntity.name = toUpdate.name
      groupEntity.description = toUpdate.description
      return groupRepository.save(groupEntity)
    })
  }

  /**
   * Deletes group
   * @param id group identifier to delete
   * @throws ${@link OpenArtifactoryError} if group not found
   */
  public static async delete(id: number): Promise<Group> {
    return repository.executeTransaction(async (entityManager) => {
      const groupRepository = entityManager.getRepository(Group)
      const groupEntity = await this.get(id, groupRepository)

      await groupRepository.remove(groupEntity)

      return groupEntity
    })
  }
}
