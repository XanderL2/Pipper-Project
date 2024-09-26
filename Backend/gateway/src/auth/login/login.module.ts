import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { CryptUtilsService } from 'src/shared/utils/crypt-utils.service';
import { JwtStrategy } from './auth.strategy';
import { SECRET } from 'src/shared/constants/constants';


@Module({
  imports: [
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],

  controllers: [LoginController],
  providers: [LoginService, CryptUtilsService, JwtStrategy],
})
export class LoginModule { }

