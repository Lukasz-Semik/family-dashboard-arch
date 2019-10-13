import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { omitBy } from 'lodash';

import { EnvService } from '../env';
import { TokenExpiration } from './token.constants';

interface TokenPayload {
  email: string;
  id?: number;
}

@Injectable()
export class TokenService {
  private secret = this.envService.get<string>('JWT_TOKEN');

  constructor(private envService: EnvService) {}

  create(payloadRaw: TokenPayload, expiresIn: TokenExpiration = TokenExpiration.Hours24) {
    const payload = omitBy(payloadRaw, key => !Boolean(key));

    const token = jwt.sign(payload, this.secret, {
      expiresIn,
      algorithm: 'HS256',
    });

    return token;
  }

  decode(
    token: string | string[] | number
  ): Promise<{
    email: string;
    id: number;
    iat: number;
    exp: number;
  }> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        resolve(decoded);
      });
    });
  }
}
