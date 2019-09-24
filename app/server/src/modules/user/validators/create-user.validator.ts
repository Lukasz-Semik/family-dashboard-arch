import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserValidator {
  @IsNotEmpty({
    message: 'TODO',
  })
  @IsEmail(undefined, {
    message: 'TODO',
  })
  public readonly email: string;

  @IsNotEmpty({
    message: 'TODO',
  })
  @Matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])(?=.{8,})'), {
    message: 'TODO',
  })
  public readonly password: string;

  @IsNotEmpty({
    message: 'TODO',
  })
  public readonly firstName: string;

  @IsNotEmpty({
    message: 'TODO',
  })
  public readonly lastName: string;
}
