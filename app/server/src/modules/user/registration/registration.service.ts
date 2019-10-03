import { Injectable, HttpStatus } from '@nestjs/common';
import { getRepository, Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { User, UserSignUpPostOptions } from '@family-dashboard/app-types';
import { isEmpty } from 'lodash';

import { User as UserEntity } from '../../../entities';
import { throwError } from '../../../helpers/errors';
import { userBaseSerializator } from '../../../serializators';
import { MailsService } from '../../mails/mails.service';

@Injectable()
export class RegistrationService {
  private userRepo = getRepository(UserEntity);

  public constructor(private connection: Connection, private mailsService: MailsService) {}

  public async createUser(body: UserSignUpPostOptions): Promise<User> {
    const { email, password, firstName, lastName } = body;

    try {
      const newUser = new UserEntity();

      const hashedPassword = await hash(password, 10);

      const createdUser = await this.userRepo.save({
        ...newUser,
        password: hashedPassword,
        email,
        firstName,
        lastName,
      });

      if (!isEmpty(createdUser)) {
        this.mailsService.sendAccountConfirmationEmail(
          createdUser.email,
          createdUser.firstName,
          'token'
        );
      }

      return userBaseSerializator(createdUser);
    } catch (err) {
      throwError(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }
}
