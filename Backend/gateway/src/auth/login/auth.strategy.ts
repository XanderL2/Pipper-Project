import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtPayload } from './interfaces/jwtOPayload.interface';
import { SECRET } from 'src/shared/constants/constants';


@Injectable()  
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false, 
      secretOrKey: SECRET, 
    });
  }

  async validate(payload: jwtPayload) {
    return { id: payload.sub, role: payload.role};
  }

}
