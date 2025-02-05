import HttpResponse from 'http-response-client';
import DefaultError from 'http-response-client/lib/errors/default-error';

export abstract class BaseError extends Error {
  public statusCode: number;
  public message: string;
  public details: any;

  protected constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  toHttpResponse(): DefaultError {
    return HttpResponse.createError(this.statusCode, {
        name: this.name,
        msg: this.message,
    });
  }
}