import { HttpStatus } from '@nestjs/common';
import { getRepository, Connection } from 'typeorm';
import { UserSignUpPostOptions } from '@family-dashboard/app-types';
import { EmailErrors } from '@family-dashboard/app-errors';

import { CreateUserValidator } from '../validators';
import { User } from '../../../entities';
import { BodyValidatorPipe } from '../../../pipes';

interface CreateUserErrors {
  requestBody?: string[];
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  password?: string[];
}

export class CreateUserValidatorPipe extends BodyValidatorPipe<
  UserSignUpPostOptions,
  CreateUserErrors,
  typeof CreateUserValidator
> {
  private userRepo = getRepository(User);

  // constructor(private readonly connection: Connection) {
  //   super();
  // }

  async transform(reqBody: UserSignUpPostOptions) {
    await this.validateEmailTaken(reqBody.email);

    await this.validateFields(reqBody, CreateUserValidator);

    return reqBody;
  }

  private async validateEmailTaken(email?: string) {
    const existingUser = await this.userRepo.findOne({ email });

    if (existingUser) {
      this.throwError(HttpStatus.CONFLICT, {
        email: [EmailErrors.Taken],
      });
    }
  }
}