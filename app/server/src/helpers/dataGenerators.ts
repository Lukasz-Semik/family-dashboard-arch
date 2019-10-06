import { User } from '@family-dashboard/app-types';

export const generateUser = ({
  email = 'seeded-default@email.com',
  firstName = 'John',
  lastName = 'Doe',
  password = 'Password123.',
}: User) => ({
  email,
  firstName,
  lastName,
  password,
});
