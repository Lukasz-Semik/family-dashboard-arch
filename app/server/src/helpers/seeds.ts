import { getConnection, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from '@family-dashboard/app-types';

import { User as UserEntity } from '../entities';
import { generateUser } from './dataGenerators';

export const dropDb = async () => {
  const connection = await getConnection();
  return await connection.query('TRUNCATE TABLE "user" RESTART IDENTITY;');
};

export const dbSeedUser: any = async (userData: Partial<User>) => {
  const userRepository = getRepository(UserEntity);
  const user = generateUser(userData);

  const hashedPassword = await hash(user.password, 10);

  const newUser = new UserEntity();

  const createdUser = await userRepository.save({
    ...newUser,
    ...user,
    password: hashedPassword,
  });

  return createdUser;
};
