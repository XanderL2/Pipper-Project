import { Module } from '@nestjs/common';
import { UserRegister } from './userRegister.service';
import { RegisterController } from './register.controller';
import { CryptUtilsService } from 'src/shared/utils/crypt-utils.service';
import { AdminRegisterService } from './adminRegister.service';


@Module({
    controllers: [RegisterController],
    providers: [UserRegister, AdminRegisterService, CryptUtilsService],
})
export class RegisterModule { }
