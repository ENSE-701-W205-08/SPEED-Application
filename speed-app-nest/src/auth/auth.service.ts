import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate the user credentials and return a JWT token
  async validateUser(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    // Find the user in MongoDB
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token if the credentials are valid
    const payload = { email: user.email, sub: user.createdAt };
    return { token: this.jwtService.sign(payload) };
  }

  // Register a new user (optional, for signup functionality)
  async registerUser(
    email: string,
    password: string,
  ): Promise<{ token: string }> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving
    const user = await this.usersService.createUser(email, hashedPassword);

    // Generate JWT token for the new user
    const payload = { email: user.email, sub: user.createdAt };
    return { token: this.jwtService.sign(payload) };
  }
}
