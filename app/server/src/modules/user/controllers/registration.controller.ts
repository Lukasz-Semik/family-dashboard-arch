import { Controller, Body, Post, Res, HttpStatus, Get, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { apiRoutes } from '@family-dashboard/api-routes';
import { UserSignUpPostOptions } from '@family-dashboard/app-types';

import { RegistrationService } from '../services/registration.service';
import { CreateUserValidatorPipe } from '../pipes';

@Controller(apiRoutes.user.base)
@UsePipes(CreateUserValidatorPipe)
export class RegistrationController {
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

  // TODO: remove test route
  @Get()
  public testRoute(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      msg: 'Test passed',
    });
  }
}
