import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants/constants';



@Injectable()
export class CryptUtilsService {


    async hashPassword(password: string) {
        return await bcrypt.hash(password, SALT_ROUNDS);
    }


    // async verifyUser(password: string, username: string) {

    //     try {

    //         const user = await this.prismaService.user.findUnique({
    //             where: { username: username },
    //             select: { password: true, username: true }
    //         });

    //         const isEqual = await bcrypt.compare(password, user.password);
    //         return isEqual;

    //     } catch (error) {
    //         throw new Error(`Error during password comparison: ${error.message}`);

    //     }

    // }


}

