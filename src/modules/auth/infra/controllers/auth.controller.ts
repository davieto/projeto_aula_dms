import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "../../application/services/auth.service";
import { Public } from "src/shared/infra/decorators/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("login")
  @Public()
  login(@Body() body: any) {
    return this.service.login(body.email, body.password);
  }
}