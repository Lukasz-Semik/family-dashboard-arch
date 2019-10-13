import { Controller, Body, Post, Res, HttpStatus, UsePipes, Patch } from '@nestjs/common';
import { Response } from 'express';
import { userApi } from '@family-dashboard/api-routes';
import { UserSignUpPostOptions } from '@family-dashboard/app-types';

import { RegistrationService } from './services';
import { CreateUserValidatorPipe, ConfirmUserValidatorPipe } from './pipes';
import { TokenService } from '../utils/token';

@Controller(userApi.name)
export class UserController {
  public constructor(
    private registrationService: RegistrationService,
    private tokenService: TokenService
  ) {}

  @Post()
  @UsePipes(CreateUserValidatorPipe)
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

  @Patch(userApi.confirm.name)
  @UsePipes(ConfirmUserValidatorPipe)
  public async confirmUser(
    @Body() body: UserSignUpPostOptions,
    @Res() res: Response
  ): Promise<Response> {
    const user = await this.registrationService.confirmUser(body);

    return res.status(HttpStatus.OK).json({
      msg: 'User has been successfully confirmed',
      data: {
        user,
      },
    });
  }
}
