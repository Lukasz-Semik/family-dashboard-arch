import { PipeTransform, HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { isEmpty } from 'lodash';
import { BaseErrors } from '@family-dashboard/app-errors';
import { UserSignUpPostOptions } from '@family-dashboard/app-types';

@Injectable()
export class BodyValidatorPipe<T, E, V> implements PipeTransform {
  async transform(reqBody: T) {
    return reqBody;
  }

  protected validateBody(reqBody?: T) {
    if (!reqBody) {
      throw new HttpException(
        {
          statusCode: status,
          requestBody: BaseErrors.Required,
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

  protected async validateFields(
    reqBody: UserSignUpPostOptions,
    validatorSchema: V
  ): Promise<void> {
    const payloadClass = plainToClass(validatorSchema as any, reqBody);
    const validationErrors = await validate(payloadClass);

    const errors = {} as E;

    validationErrors.forEach(error => {
      errors[error.property] = Object.values(error.constraints);
    });

    this.throwError(HttpStatus.BAD_REQUEST, errors);
  }
}
