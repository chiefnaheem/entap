import { Body, Controller, HttpStatus, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/interface/response.interface';
import { LoginDto, RegisterDto, ResetPasswordDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto): Promise<ResponseDto> {
    try {
      const response = await this.authService.login(data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: response,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }



  @Post('register')
  async register(@Body() data: RegisterDto): Promise<ResponseDto> {
    try {
      const response = await this.authService.register(data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Registration successful',
        data: response,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }



}
