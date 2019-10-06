import { HttpStatus } from '@nestjs/common';
import { getRepository, Connection } from 'typeorm';
import { UserSignUpPostOptions } from '@family-dashboard/app-types';
import { EmailErrors } from '@family-dashboard/app-errors';

import { CreateUserValidator } from './create-user.validator';
import { User } from '../../../../../entities';
import { BodyValidatorPipe } from '../../../../../pipes';
import { throwError } from '../../../../../helpers/errors';

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

  constructor(private readonly connection: Connection) {
    super();
  }

  async transform(reqBody: UserSignUpPostOptions) {
    await this.validateBody(reqBody);

    await this.validateEmailTaken(reqBody.email);

    await this.validateFields(reqBody, CreateUserValidator);

    return reqBody;
  }

  private async validateEmailTaken(email?: string) {
    const existingUser = await this.userRepo.findOne({ email });

    if (existingUser) {
      throwError(HttpStatus.CONFLICT, {
        email: [EmailErrors.Taken],
      });
    }
  }
}
