export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserSignUpPostOptions
  extends Pick<User, 'email' | 'password' | 'firstName' | 'lastName'> {}
