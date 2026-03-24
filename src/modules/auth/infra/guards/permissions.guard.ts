import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Pegar permissões exigidas da rota
    const requiredPermissions = this.reflector.get<string[]>(
      "permissions",
      context.getHandler()
    );

    // 2. Se não tiver permissões, libera
    if (!requiredPermissions) {
      return true;
    }

    // 3. Pegar usuário do request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 4. Verificar permissões
    const hasPermission = requiredPermissions.every((permission) =>
      user?.permissions?.includes(permission)
    );

    if (!hasPermission) {
      throw new ForbiddenException("Sem permissão");
    }

    return true;
  }
}