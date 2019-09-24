import { HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import { ErrorTypes, RequiredError, UserSignUpPostOptions } from '@family-dashboard/app-types';

import { CreateUserValidator } from '../validators';
import { User } from '../../../entities';
import { BodyValidatorPipe } from '../../../pipes';

// interface EmailErrors extends RequiredError {
//   isEmail?: ErrorTypes.WrongFormat;
//   isTaken?: ErrorTypes.Taken;
// }

// interface PasswordErros extends RequiredError {
//   hasWrongFormat?: ErrorTypes.WrongFormat;
// }

interface CreateUserErrors {
  requestBody?: 'ds';
  firstName?: 'ds';
  lastName?: 'ds';
  email?: 'ds';
  password?: 'ds';
}

export class CreateUserValidatorPipe extends BodyValidatorPipe<
  UserSignUpPostOptions,
  CreateUserErrors
> {
  private userRepo = getRepository(User);

  async transform(reqBody: UserSignUpPostOptions) {
    await this.validateEmailTaken(reqBody.email);

    await this.validateFields(reqBody);

    return reqBody;
  }

  private async validateEmailTaken(email?: string) {
    const existingUser = await this.userRepo.findOne({ email });

    if (existingUser) {
      this.throwError(HttpStatus.CONFLICT, {
        email: 'ds',
        // email: {
        //   isTaken: 'ds',
        // },
      });
    }
  }

  private async validateFields(reqBody: UserSignUpPostOptions): Promise<void> {
    const payloadClass = plainToClass(CreateUserValidator, reqBody);
    this.validationErrors = await validate(payloadClass);

    const errors = {} as CreateUserErrors;

    console.log('dsa', this.validationErrors);

    const emailErrors = this.getErrors('email');
    if (emailErrors) {
      errors.email = emailErrors.constraints;
    }

    const firstNameErrors = this.getErrors('firstName');
    if (firstNameErrors) {
      errors.firstName = firstNameErrors.constraints;
    }

    const lastNameErrors = this.getErrors('lastName');
    if (lastNameErrors) {
      errors.lastName = lastNameErrors.constraints;
    }

    const passwordErrors = this.getErrors('password');

    if (passwordErrors) {
      errors.password = passwordErrors.constraints;
    }

    this.throwError(HttpStatus.BAD_REQUEST, errors);
  }
}
