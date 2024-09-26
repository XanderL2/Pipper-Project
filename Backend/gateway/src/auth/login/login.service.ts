import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CryptUtilsService } from 'src/shared/utils/crypt-utils.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';



@Injectable()
export class LoginService {

    protected cryptUtilsService: CryptUtilsService;
    protected jwtAuthService: JwtService;


    constructor(cryptUtilsService: CryptUtilsService, jwtAuthService: JwtService) {
        this.cryptUtilsService = cryptUtilsService;
        this.jwtAuthService = jwtAuthService;
    }




    async loginUser(body: LoginDto) {

        // if (!await this.isUsernameTaken(body.username)) {
        //     throw new HttpException('Unregistered user', HttpStatus.NOT_FOUND);
        // }

        try {

            // const user = await this.prismaService.user.findUnique({
            //     where: { username: body.username },
            //     select: { id: true, password: true, username: true, role: true }
            // });

            // if (!await bcrypt.compare(body.password, user.password)) {
            //     throw new HttpException("Password incorrect", HttpStatus.UNAUTHORIZED);
            // }

            // const payload = {
            //     "sub": user.id,
            //     "role": user.role
            // }

            // const token = this.jwtAuthService.sign(payload);

            // return {
            //     "Authorization": token
            // };



        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(`Error during login: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
