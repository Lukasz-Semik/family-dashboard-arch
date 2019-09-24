import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { EmailErrors, BaseErrors } from '@family-dashboard/app-errors';

export class CreateUserValidator {
  @IsNotEmpty({
    message: BaseErrors.Required,
  })
  @IsEmail(undefined, {
    message: EmailErrors.WrongFormat,
  })
  public readonly email: string;

  @IsNotEmpty({
    message: BaseErrors.Required,
  })
  @Matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])(?=.{8,})'), {
    message: BaseErrors.WrongFormat,
  })
  public readonly password: string;

  @IsNotEmpty({
    message: BaseErrors.Required,
  })
  public readonly firstName: string;

  @IsNotEmpty({
    message: BaseErrors.Required,
  })
  public readonly lastName: string;
}
