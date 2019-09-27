import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { getRepository, Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { UserSignUpPostOptions } from '@family-dashboard/app-types';

import { User } from '../../../entities';
import { throwError } from '../../../helpers/errors';

@Injectable()
export class RegistrationService {
  private userRepo = getRepository(User);

  public constructor(private connection: Connection) {}

  public async createUser(body: UserSignUpPostOptions): Promise<User> {
    const { email, password, firstName, lastName } = body;

    try {
      const newUser = new User();

      const hashedPassword = await hash(password, 10);

      const createdUser = await this.userRepo.save({
        ...newUser,
        password: hashedPassword,
        email,
        firstName,
        lastName,
      });

      return createdUser;
    } catch (err) {
      throwError(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }
}
