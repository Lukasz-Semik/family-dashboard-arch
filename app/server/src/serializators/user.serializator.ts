import { User } from '@family-dashboard/app-types';

import { User as UserEntity } from '../entities';

export const serializeUser = (user: User & UserEntity) => {
  const { id, email, firstName, lastName, isVerified } = user;

  return {
    id,
    email,
    firstName,
    lastName,
    isVerified,
  };
};
