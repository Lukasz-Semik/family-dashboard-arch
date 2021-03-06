import { Injectable, HttpStatus } from '@nestjs/common';
import { getRepository, Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { isEmpty } from 'lodash';
import { User, UserSignUpPostOptions, UserConfirmPatchOptions } from '@family-dashboard/app-types';
import { EmailErrors } from '@family-dashboard/app-errors';

import { User as UserEntity } from '../../../entities';
import { throwError } from '../../../helpers/errors';
import { serializeUser } from '../../../serializators';
import { MailsService } from '../../utils/mails';
import { TokenService, TokenExpiration } from '../../utils/token';

@Injectable()
export class RegistrationService {
  private userRepo = getRepository(UserEntity);

  public constructor(
    private connection: Connection,
    private mailsService: MailsService,
    private tokenService: TokenService
  ) {}

  public async createUser(body: UserSignUpPostOptions): User {
    const { email, password, firstName, lastName } = body;

    try {
      const newUser = new UserEntity();

      const hashedPassword = await hash(password, 10);

      const createdUser = await this.userRepo.save({
        ...newUser,
        password: hashedPassword,
        isVerified: false,
        email,
        firstName,
        lastName,
      });

      const token = this.tokenService.create(
        {
          email: createdUser.email,
          id: createdUser.id,
        },
        TokenExpiration.ExpireWeeks2
      );

      if (!isEmpty(createdUser)) {
        this.mailsService.sendAccountConfirmationEmail(
          createdUser.email,
          createdUser.firstName,
          token
        );
      }

      return serializeUser(createdUser);
    } catch (err) {
      throwError(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  public async confirmUser(body: UserConfirmPatchOptions): User {
    const { email } = await this.tokenService.decode(body.token);

    const existingUser = await this.userRepo.findOne({ email });

    if (isEmpty(existingUser)) {
      throwError(HttpStatus.NOT_FOUND, { email: [EmailErrors.NotExist] });
    }

    if (existingUser.isVerified) {
      throwError(HttpStatus.CONFLICT, { email: [EmailErrors.AlreadyVerified] });
    }

    const confirmedUser = await this.userRepo.save({ ...existingUser, isVerified: true });

    return serializeUser(confirmedUser);
  }
}
