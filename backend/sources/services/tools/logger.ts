import { createLogger, format, transports } from 'winston'

/**
 * Disable all console methods
 */
export const disableConsole = (): void => {
  // eslint-disable-next-line no-console
  console.assert = () => {
  }
  // eslint-disable-next-line no-console
  console.clear = () => {
  }
  // eslint-disable-next-line no-console
  console.count = () => {
  }
  // eslint-disable-next-line no-console
  console.countReset = () => {
  }
  // eslint-disable-next-line no-console
  console.dir = () => {
  }
  // eslint-disable-next-line no-console
  console.debug = () => {
  }
  // eslint-disable-next-line no-console
  console.dirxml = () => {
  }
  // eslint-disable-next-line no-console
  console.error = () => {
  }
  // eslint-disable-next-line no-console
  console.group = () => {
  }
  // eslint-disable-next-line no-console
  console.groupEnd = () => {
  }
  // eslint-disable-next-line no-console
  console.groupCollapsed = () => {
  }
  // eslint-disable-next-line no-console
  console.info = () => {
  }
  // eslint-disable-next-line no-console
  console.log = () => {
  }
  // eslint-disable-next-line no-console
  console.time = () => {
  }
  // eslint-disable-next-line no-console
  console.timeLog = () => {
  }
  // eslint-disable-next-line no-console
  console.timeEnd = () => {
  }
  // eslint-disable-next-line no-console
  console.timeStamp = () => {
  }
  // eslint-disable-next-line no-console
  console.table = () => {
  }
  // eslint-disable-next-line no-console
  console.trace = () => {
  }
  // eslint-disable-next-line no-console
  console.warn = () => {
  }
}

const alignText = (text: string, size: number): string => {
  if (text.length > size) {
    return text.trim()
      .substring(0, size - 1)
  }
  return text + ' '.repeat(size - text.length)
}

/**
 * Logger instance {@link Logger}
 */
const logger = createLogger({
  transports: new transports.Console(),
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf((log) => `${log.timestamp} - ${alignText(log.level, 7)}| ${log.message} ${log.stack ? `\n${log.stack}` : ''}`)
  )
})

export default logger
