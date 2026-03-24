import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Pegar a requisição HTTP
    const request = context.switchToHttp().getRequest<Request>();

    // 2. Pegar o header Authorization
    const authHeader = request.headers.authorization;

    // 3. Verificar se existe token
    if (!authHeader) {
      throw new UnauthorizedException("Token não enviado");
    }

    // 4. Separar "Bearer TOKEN"
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      throw new UnauthorizedException("Token inválido");
    }

    try {
      // 5. Verificar o token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // 6. Salvar usuário na requisição
      (request as any).user = payload;

    } catch (error) {
      throw new UnauthorizedException("Token inválido ou expirado");
    }

    return true;
  }
}