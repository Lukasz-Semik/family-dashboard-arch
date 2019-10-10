import { User } from '@family-dashboard/app-types';

export const generateUser = ({
  email = 'seeded-default@email.com',
  firstName = 'John',
  lastName = 'Doe',
  password = 'Password123.',
  isVerified = false,
}: User) => ({
  email,
  firstName,
  lastName,
  password,
  isVerified,
});
