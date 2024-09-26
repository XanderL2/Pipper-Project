import { Controller, Post, Body, Req, HttpCode } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('login')
export class LoginController {

    private loginService: LoginService;

    constructor(loginService: LoginService) {
        this.loginService = loginService;
    }


    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'Responds with the authorization token' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @HttpCode(200)
    @Post()
    loginUser(@Req() request: Request, @Body() body: LoginDto) {
        const headers = request.headers;
        return this.loginService.loginUser(body);
    }


}



