import { NextFunction, Request, Response } from 'express'
import HttpResponse from '../model/httpResponses/HttpResponse'

export const callAsynchronousController = (
  method: (request: Request, response: Response) => Promise<void>
) => async (request: Request, response: Response, nextFunction: NextFunction) => {
  try {
    await method(request, response)
  } catch (error) {
    nextFunction(error)
  }
}

export const callAsynchronousHttpResponseController = (
  method: (request: Request) => Promise<HttpResponse>
) => callAsynchronousController(async (request: Request, response: Response) => {
  const httpResponse = await method(request)
  response.status(httpResponse.httpCode)
    .send(httpResponse)
})
