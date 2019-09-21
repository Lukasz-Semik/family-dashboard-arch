import { Controller, Post, Res, HttpStatus, Get } from '@nestjs/common';
import { Response } from 'express';
import { Connection, getRepository } from 'typeorm';

import { User } from '../../../entities';

@Controller()
export class RegistrationController {
  private userRepo = getRepository(User);

  public constructor(private connection: Connection) {}

  @Post()
  public async createUser(@Res() res: any): Promise<Response> {
    const newUser = new User();

    const createdUser = await this.userRepo.save({
      ...newUser,
      email: 'test@email.com',
    });

    return res.status(200).json(createdUser);
  }

  // TODO: remove test route
  @Get()
  public testRoute(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      msg: 'Test passed',
    });
  }
}
