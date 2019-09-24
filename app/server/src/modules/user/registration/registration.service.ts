import { Injectable } from '@nestjs/common';
import { getRepository, Connection } from 'typeorm';
import { UserSignUpPostOptions } from '@family-dashboard/app-types';

import { User } from '../../../entities';

@Injectable()
export class RegistrationService {
  private userRepo = getRepository(User);

  public constructor(private connection: Connection) {}

  public async createUser(body: UserSignUpPostOptions): Promise<User> {
    const { email, password, firstName, lastName } = body;

    const newUser = new User();

    const createdUser = await this.userRepo.save({
      ...newUser,
      email,
      password,
      firstName,
      lastName,
    });

    return createdUser;
  }
}
