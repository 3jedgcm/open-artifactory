import { createMapper } from '@automapper/core'
import { classes } from '@automapper/classes'
import fileMapper from './fileMapper'
import apiTokenMapper from './apiTokenMapper'
import badgeMapper from './badgeMapper'
import groupMapper from './groupMapper'

/**
 * Entity mapper
 * @see {@link Mapper} for usage
 */
const mapper = createMapper({ strategyInitializer: classes() })

/**
 * Mapper definitions calls
 */
fileMapper(mapper)
apiTokenMapper(mapper)
badgeMapper(mapper)
groupMapper(mapper)

export default mapper
