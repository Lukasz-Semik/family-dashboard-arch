import { HttpStatus } from '@nestjs/common';
import { getRepository, Connection } from 'typeorm';
import { UserSignUpPostOptions } from '@family-dashboard/app-types';
import { EmailErrors } from '@family-dashboard/app-errors';

import { ConfirmUserValidator } from './confirm-user.validator';
import { User } from '../../../../entities';
import { BodyValidatorPipe } from '../../../../pipes';
import { throwError } from '../../../../helpers/errors';
import { TokenService } from '../../../utils/token';

interface ConfirmUserErrors {
  requestBody?: string[];
  token?: string[];
  email?: string[];
}

export class ConfirmUserValidatorPipe extends BodyValidatorPipe<
  UserSignUpPostOptions,
  ConfirmUserErrors,
  typeof ConfirmUserValidator
> {
  private userRepo = getRepository(User);

  constructor(private readonly connection: Connection, private tokenService: TokenService) {
    super();
    console.log({ tokenService });
  }

  async transform(reqBody: UserSignUpPostOptions) {
    await this.validateBody(reqBody);

    await this.validateFields(reqBody, ConfirmUserValidator);
    // console.log(this.tokenService, reqBody);
    // this.validateEmailExistence(reqBody.token);

    return reqBody;
  }

  async validateEmailExistence(token: string) {
    const decoded = await this.tokenService.decode(token);
    console.log(decoded);
  }
}
