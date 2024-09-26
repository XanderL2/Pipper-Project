import { Controller, Post, Body, HttpCode, Headers, UseGuards } from '@nestjs/common';
import { UserRegister } from './userRegister.service';
import { RegisterDto } from './dto/register-user.dto';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminRegisterService } from './adminRegister.service';
import { LoginGuard } from '../login/login.guard';
import { Roles } from '../login/decorators/roles.decorator';


@Controller('register')
@ApiTags('Register')
export class RegisterController {

    private userRegisterService: UserRegister;
    private adminRegisterService: AdminRegisterService;
    

    constructor(userRegisterService: UserRegister, adminRegisterService: AdminRegisterService) {
        this.userRegisterService= userRegisterService;
        this.adminRegisterService = adminRegisterService;
    }


    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'Returns the record that has been inserted into the database' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({ type: RegisterDto})
    @HttpCode(201)
    @Post()
    async createUser(@Body() userData: RegisterDto) {
        return await this.userRegisterService.createUser(userData);
    }


    @UseGuards(LoginGuard)
    @Roles('Admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Register a new Admin' })
    @ApiHeader({ name: 'Authorization', description: 'Admin token bearer', required: true })
    @ApiResponse({ status: 201, description: 'Returns the record that has been inserted into the database' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({ type: RegisterDto})
    @HttpCode(201)
    @Post('/admin')
    async createAdmin(@Headers('Authorization') token: string, @Body() userData: RegisterDto) {
        return await this.adminRegisterService.createAdmin(userData);
    }


}
