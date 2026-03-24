import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/users/application/services/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.validateCredentials(email, password);
    if (!user) throw new UnauthorizedException();

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      permissions: user.permissions,
    });

    return { accessToken };
  }
}