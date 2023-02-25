import { NextFunction, Request, Response } from 'express'

/**
 * Disable CORS issues on DEV mode
 */
export default (request: Request, response: Response, nextFunction: NextFunction): void => {
  if (process.env.NODE_ENV !== 'production') {
    response.setHeader('access-control-allow-credentials', 'true')
    response.setHeader('access-control-allow-headers', '*')
    response.setHeader('access-control-allow-methods', '*')
    response.setHeader('access-control-allow-origin', '*')
  }
  nextFunction()
}
