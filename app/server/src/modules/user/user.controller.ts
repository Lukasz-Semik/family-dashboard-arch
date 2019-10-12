import { Controller, Body, Post, Res, HttpStatus, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { userApi } from '@family-dashboard/api-routes';
import { UserSignUpPostOptions } from '@family-dashboard/app-types';

import { RegistrationService } from './services';
import { CreateUserValidatorPipe } from './pipes';

@Controller(userApi.base)
@UsePipes(CreateUserValidatorPipe)
export class UserController {
  public constructor(private registrationService: RegistrationService) {}

  @Post()
  public async createUser(
    @Body() body: UserSignUpPostOptions,
    @Res() res: Response
  ): Promise<Response> {
    const user = await this.registrationService.createUser(body);

    return res.status(HttpStatus.CREATED).json({
      msg: 'User has been successfully created',
      data: {
        user,
      },
    });
  }
}
