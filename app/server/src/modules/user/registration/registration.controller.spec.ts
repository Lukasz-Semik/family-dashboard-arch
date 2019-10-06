import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { apiRoutes } from '@family-dashboard/api-routes';
import { EmailErrors, BaseErrors } from '@family-dashboard/app-errors';

import { dropDb, dbSeedUser } from '../../../helpers/seeds';
import { generateUser } from '../../../helpers/dataGenerators';
import { UserModule } from '../user.module';
import { DatabaseOrmModule } from '../../utils/database';
import { TokenModule } from '../../utils/token';
import { EnvModule } from '../../utils/env';
import { MailsModule } from '../../utils/mails';

describe('RegistrationController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [UserModule, TokenModule, MailsModule, EnvModule, DatabaseOrmModule()],
    }).compile();

    app = appModule.createNestApplication();

    await app.init();
  });

  describe(`Api Route ${apiRoutes.user.api}`, () => {
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
          .post(apiRoutes.user.route)
          .send(user)
          .expect(201)
          .expect(res => {
            const { msg, data } = res.body;
            const { id, email, firstName, lastName } = data.user;

            expect(msg).toBe('User has been successfully created');
            expect(id).toEqual(expect.any(Number));
            expect(email).toBe(user.email);
            expect(firstName).toBe(user.firstName);
            expect(lastName).toBe(user.lastName);
          })
          .expect(() => done());
      });

      it('should return various errors', async done => {
        await request(app.getHttpServer())
          .post(apiRoutes.user.route)
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
          .post(apiRoutes.user.route)
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

  afterAll(async () => {
    await app.close();
  });
});
