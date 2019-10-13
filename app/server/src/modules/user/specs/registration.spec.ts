import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { userApi } from '@family-dashboard/api-routes';
import { EmailErrors, BaseErrors } from '@family-dashboard/app-errors';

import { DatabaseOrmModule } from '../../../database-orm.module';
import { dropDb, dbSeedUser } from '../../../helpers/seeds';
import { generateUser } from '../../../helpers/dataGenerators';
import { UserModule } from '../user.module';
import { TokenModule, TokenService } from '../../utils/token';
import { EnvModule, EnvService } from '../../utils/env';
import { MailsModule } from '../../utils/mails';

describe('Registration', () => {
  let app: INestApplication;
  let tokenService: TokenService;

  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [UserModule, TokenModule, MailsModule, EnvModule, DatabaseOrmModule()],
    }).compile();

    app = appModule.createNestApplication();

    await app.init();

    tokenService = new TokenService(new EnvService());
  });

  describe(`Api Route ${userApi.fullRoute}`, () => {
    describe('POST method', () => {
      beforeAll(async () => {
        await dropDb();
        await dbSeedUser({
          email: 'john.doe@email.com',
        });
      });

      it('should create user', async done => {
        const user = generateUser({
          email: 'test@email.com',
          password: 'Password123.',
          firstName: 'Lukasz',
          lastName: 'Semik',
        });

        await request(app.getHttpServer())
          .post(userApi.route)
          .send(user)
          .expect(201)
          .expect(res => {
            const { msg, data } = res.body;
            const { id, email, firstName, lastName, isVerified } = data.user;

            expect(msg).toBe('User has been successfully created');
            expect(id).toEqual(expect.any(Number));
            expect(email).toBe(user.email);
            expect(firstName).toBe(user.firstName);
            expect(lastName).toBe(user.lastName);
            expect(isVerified).toBe(false);
          })
          .expect(() => done());
      });

      it('should return various errors', async done => {
        await request(app.getHttpServer())
          .post(userApi.route)
          .send({
            email: 'wrong email format',
            password: 'wrong password format',
            lastName: 'Doe',
          })
          .expect(400)
          .expect(res => {
            const { email, password, firstName, lastName } = res.body.errors;

            expect(email.includes(EmailErrors.WrongFormat)).toBe(true);
            expect(password.includes(BaseErrors.WrongFormat)).toBe(true);
            expect(firstName.includes(BaseErrors.Required)).toBe(true);
            expect(lastName).toBe(undefined);
          })
          .expect(() => done());
      });

      it('should return email already taken error', async done => {
        await request(app.getHttpServer())
          .post(userApi.route)
          .send({
            email: 'john.doe@email.com',
            password: 'Password123.',
            firstName: 'Lukasz',
            lastName: 'Semik',
          })
          .expect(409)
          .expect(res => {
            const { errors } = res.body;

            expect(errors.email).toHaveLength(1);
            expect(errors.email.includes(EmailErrors.Taken)).toBe(true);
          })
          .expect(() => done());
      });
    });
  });

  describe(`Api Route ${userApi.confirm.fullRoute}`, () => {
    describe('PATCH method', () => {
      const existingEmail = 'john.doe@email.com';
      const notExistingEmail = 'jane.doe@email.com';
      const alreadyVerifiedEmail = 'tony.hawk@email.com';

      beforeAll(async () => {
        await dropDb();
        await dbSeedUser({
          email: existingEmail,
        });
        await dbSeedUser({
          email: alreadyVerifiedEmail,
          isVerified: true,
        });
      });

      it('should confirm user', async done => {
        const token = tokenService.create({ email: existingEmail });

        await request(app.getHttpServer())
          .patch(userApi.confirm.route)
          .send({
            token,
          })
          .expect(200)
          .expect(res => {
            const { msg, data } = res.body;
            const { email, isVerified } = data.user;

            expect(msg).toBe('User has been successfully confirmed');
            expect(email).toBe(existingEmail);
            expect(isVerified).toBe(true);
          })
          .expect(() => done());
      });

      it('should return error for not existing user', async done => {
        const token = tokenService.create({ email: notExistingEmail });

        await request(app.getHttpServer())
          .patch(userApi.confirm.route)
          .send({
            token,
          })
          .expect(404)
          .expect(res => {
            const { errors } = res.body;

            expect(errors.email).toHaveLength(1);
            expect(errors.email.includes(EmailErrors.NotExist)).toBe(true);
          })
          .expect(() => done());
      });

      it('should return error for already verified user', async done => {
        const token = tokenService.create({ email: alreadyVerifiedEmail });

        await request(app.getHttpServer())
          .patch(userApi.confirm.route)
          .send({
            token,
          })
          .expect(409)
          .expect(res => {
            const { errors } = res.body;

            expect(errors.email).toHaveLength(1);
            expect(errors.email.includes(EmailErrors.AlreadyVerified)).toBe(true);
          })
          .expect(() => done());
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
