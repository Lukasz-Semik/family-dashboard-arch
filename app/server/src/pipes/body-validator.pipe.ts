import { PipeTransform, HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Connection } from 'typeorm';
import { isEmpty, find } from 'lodash';

@Injectable()
export class BodyValidatorPipe<T, E> implements PipeTransform {
  protected validationErrors: ValidationError[] = [];

  constructor(public readonly connection: Connection) {}

  async transform(reqBody: T) {
    return reqBody;
  }

  protected validateBody(reqBody?: T) {
    if (!reqBody) {
      throw new HttpException(
        {
          statusCode: status,
          requestBody: 'TODO: ',
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  protected throwError(status: HttpStatus, errors: E): void {
    if (!isEmpty(errors)) {
      throw new HttpException(
        {
          statusCode: status,
          errors,
        },
        status
      );
    }
  }

  protected getErrors(name: string) {
    return find(this.validationErrors, error => error.property === name);
  }
}
