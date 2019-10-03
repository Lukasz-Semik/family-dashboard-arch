import { User } from '@family-dashboard/app-types';

import { User as UserEntity } from '../entities';

export const userBaseSerializator = (user: User & UserEntity) => {
  const { id, email, firstName, lastName } = user;

  return {
    id,
    email,
    firstName,
    lastName,
  };
};
