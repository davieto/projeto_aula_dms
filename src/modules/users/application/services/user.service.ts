import bcrypt from "bcryptjs";
import { Injectable, Inject } from "@nestjs/common";

import { USER_REPOSITORY } from "../../domain/repositories/user-repository.interface";
import type { UserRepository } from "../../domain/repositories/user-repository.interface";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repo: UserRepository,
  ) {}

  async validateCredentials(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    return user;
  }
}