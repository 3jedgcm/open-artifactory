import { In } from 'typeorm'
import Badge from '../../model/entities/Badge'
import repository from '../dataSource/repository'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'

/**
 * Service to manage badge entities
 */
export default class BadgeService {
  /**
   * Gets badge list
   */
  public static async getList(): Promise<Badge[]> {
    return repository.badges.find()
  }

  /**
   * Gets badge by identifier
   * @param id badge identifier to get
   * @param badgeRepository repository to use
   * @throws ${@link OpenArtifactoryError} if badge not found
   */
  public static async get(id: number, badgeRepository = repository.badges): Promise<Badge> {
    const badgeEntity = await badgeRepository.findOneBy({ id })
    if (badgeEntity) {
      return badgeEntity
    }

    throw new OpenArtifactoryError(404, `#${id} badge not found`)
  }

  /**
   * Gets badges by ids
   * @param ids badge identifier list
   * @param badgeRepository repository to use
   * @throws ${@link OpenArtifactoryError} if any badge not found
   */
  public static async getListById(
    ids: number[],
    badgeRepository = repository.badges
  ): Promise<Badge[]> {
    const badgeEntities = await badgeRepository.findBy({ id: In(ids) })
    if (badgeEntities.length === ids.length) {
      return badgeEntities
    }

    const notFoundIds = ids.filter((id) => !badgeEntities.some((badge) => badge.id === id))
    const notFoundIdsString = notFoundIds.map((id) => `#${id} `)
      .toString()
    throw new OpenArtifactoryError(404, `${notFoundIdsString} badge${notFoundIds.length > 1 ? 's' : ''} not found`)
  }

  /**
   * Creates new badge
   * @param toCreate badge to create
   * @throws ${@link OpenArtifactoryError} if badge xith same name exists
   */
  public static async create(toCreate: Badge): Promise<Badge> {
    return repository.executeTransaction(async (entityManager) => {
      const badgeRepository = entityManager.getRepository(Badge)

      if (await badgeRepository.findOneBy({ name: toCreate.name })) {
        throw new OpenArtifactoryError(422, `"${toCreate.name}" badge already exists`)
      }

      const badgeEntity = badgeRepository.create()
      badgeEntity.name = toCreate.name
      badgeEntity.color = toCreate.color
      badgeEntity.description = toCreate.description
      return badgeRepository.save(badgeEntity)
    })
  }

  /**
   * Updates badge
   * @param toUpdate badge to update
   * @throws ${@link OpenArtifactoryError} if badge not found or badge with same name exists
   */
  public static async update(toUpdate: Badge): Promise<Badge> {
    return repository.executeTransaction(async (entityManager) => {
      const badgeRepository = entityManager.getRepository(Badge)
      const badgeEntity = await this.get(toUpdate.id, badgeRepository)

      if (badgeEntity.name !== toUpdate.name
        && await badgeRepository.findOneBy({ name: toUpdate.name })) {
        throw new OpenArtifactoryError(422, `"${toUpdate.name}" badge already exists`)
      }

      badgeEntity.name = toUpdate.name
      badgeEntity.color = toUpdate.color
      badgeEntity.description = toUpdate.description
      return badgeRepository.save(badgeEntity)
    })
  }

  /**
   * Deletes badge
   * @param id badge identifier to delete
   * @throws ${@link OpenArtifactoryError} if badge not found
   */
  public static async delete(id: number): Promise<Badge> {
    return repository.executeTransaction(async (entityManager) => {
      const badgeRepository = entityManager.getRepository(Badge)
      const badgeEntity = await this.get(id, badgeRepository)

      await badgeRepository.remove(badgeEntity)

      return badgeEntity
    })
  }
}
