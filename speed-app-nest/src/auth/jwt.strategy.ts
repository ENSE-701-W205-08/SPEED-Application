import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract the token from the Authorization header
      ignoreExpiration: false, // Ensure token expiration is checked
      secretOrKey: 'your_secret_key', // Replace with environment variable in production
    });
  }

  // Validate the token's payload
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }; // Return user info from token payload
  }
}
