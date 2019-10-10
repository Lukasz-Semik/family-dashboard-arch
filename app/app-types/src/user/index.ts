export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
}

export interface UserSignUpPostOptions
  extends Pick<User, 'email' | 'password' | 'firstName' | 'lastName'> {}
