import { EntityManager, QueryRunner } from 'typeorm'
import dataSource from './index'
import File from '../../model/entities/File'
import ApiToken from '../../model/entities/ApiToken'
import Group from '../../model/entities/Group'
import Badge from '../../model/entities/Badge'

/**
 * Repository based on {@link dataSource}
 */
export default {
  files: dataSource.getRepository(File),
  apiTokens: dataSource.getRepository(ApiToken),
  badges: dataSource.getRepository(Badge),
  groups: dataSource.getRepository(Group),
  /**
   * Helper to execute SQL transaction with TypeORM
   * @param callback async method to execute in transaction.
   * {@link EntityManager} parameter allows access to database
   * @return result of callback execution
   * @throws error from TypeORM transaction or error from callback
   */
  executeTransaction:
    async <T>(callback: (entityManager: EntityManager) => Promise<T>)
    : Promise<T> => {
      let queryRunner!: QueryRunner
      try {
        queryRunner = dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        const result = await callback(queryRunner.manager)

        await queryRunner.commitTransaction()
        return result
      } catch (error) {
        if (queryRunner && queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction()
        }
        throw error
      } finally {
        if (queryRunner) {
          await queryRunner.release()
        }
      }
    }

}
