import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt'; // Import this
import { CreateUserDto } from '../users/create-user.dto';
import { LoginDto } from 'src/users/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private authService: AuthService,
    private jwtService: JwtService, // Inject JwtService here
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    this.logger.log('Attempting to sign up a new user');
    try {
      const result = await this.authService.signUp(
        createUserDto.email,
        createUserDto.name,
        createUserDto.password,
      );
      this.logger.log(`New user signed up: ${createUserDto.email}`);
      return result;
    } catch (error) {
      this.logger.error(`Sign up failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req): Promise<any> {
    this.logger.log(`User login attempt: ${loginDto.email}`);
    const payload = { email: req.user.email, sub: req.user.userId };
    const accessToken = this.jwtService.sign(payload);
    this.logger.log(`User logged in: ${req.user.email}`);
    return {
      access_token: accessToken,
      ...req.user,
    };
  }

  @UseGuards(AuthGuard('local'))
  @Get('')
  async getProfile(@Request() req) {
    this.logger.log(`Profile requested for user: ${req.user.email}`);
    return req.user; // Returns the decoded JWT user data
  }
}
