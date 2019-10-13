import { IsNotEmpty } from 'class-validator';
import { BaseErrors } from '@family-dashboard/app-errors';

export class ConfirmUserValidator {
  @IsNotEmpty({
    message: BaseErrors.Required,
  })
  public readonly token: string;
}
