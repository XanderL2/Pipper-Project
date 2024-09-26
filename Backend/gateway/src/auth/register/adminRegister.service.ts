import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register-user.dto';
// import { UsersUtils } from 'src/shared/utils/users-utils.service';
import { CryptUtilsService } from 'src/shared/utils/crypt-utils.service';



@Injectable()
export class AdminRegisterService {

  protected cryptUtilsService: CryptUtilsService;

  constructor(cryptUtilsService: CryptUtilsService) {
    this.cryptUtilsService = cryptUtilsService;
  }


  // async createAdmin(userData: RegisterDto) {

  //   if (await this.isUsernameTaken(userData.username)) {
  //     throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
  //   }

  //   if (await this.isEmailAlreadyRegistered(userData.email)) {
  //     throw new HttpException('User email already in use', HttpStatus.BAD_REQUEST);
  //   }

  //   const creationQuery = await this.prismaService.user.create({
  //     data: {
  //       username: userData.username,
  //       email: userData.email,
  //       password: await this.cryptUtilsService.hashPassword(userData.password),
  //       role: 'Admin'
  //     }
  //   });

  //   const { password, email, isVerified, ...response } = creationQuery;

  //   return response;
  // }




}

