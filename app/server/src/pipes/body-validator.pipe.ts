import { PipeTransform, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { isEmpty } from 'lodash';
import { BaseErrors } from '@family-dashboard/app-errors';
import { UserSignUpPostOptions } from '@family-dashboard/app-types';

import { throwError } from '../helpers/errors';

@Injectable()
export class BodyValidatorPipe<T, E, V> implements PipeTransform {
  async transform(reqBody: T) {
    return reqBody;
  }

  protected validateBody(reqBody?: T) {
    if (isEmpty(reqBody)) {
      throwError(HttpStatus.BAD_REQUEST, { body: BaseErrors.Required });
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

    if (!isEmpty(errors)) {
      throwError(HttpStatus.BAD_REQUEST, errors);
    }
  }
}
