// import { Injectable } from "@nestjs/common";

// @Injectable()
// export class UsersUtils {

//     protected prismaService: PrismaService;


//     constructor(prismaService: PrismaService) {
//         this.prismaService = prismaService;
//     }

//     protected async itIsAnExistingId(id: number) {

//         const user = await this.prismaService.user.findUnique({
//             where: { id },
//         });

//         return user != null ? true : false;
//     }



//     protected async isUsernameTaken(username: string) {
//         const existingUsers = await this.prismaService.user.findMany({
//             where: { username: username },
//         });

//         return existingUsers.length > 0 ? true : false;
//     }

//     protected async isEmailAlreadyRegistered(email: string) {
//         const usersWithEmail = await this.prismaService.user.findMany({
//             where: { email: email },
//         });

//         return usersWithEmail.length > 0 ? true : false;
//     }

// }
