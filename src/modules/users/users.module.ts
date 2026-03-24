import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';

import { USER_REPOSITORY } from './domain/repositories/user-repository.interface';
import { DrizzleUserRepository } from "./domain/repositories/drizzle-user.repository";

@Module({
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: DrizzleUserRepository,
    },
  ],
  exports: [UserService],
})
export class UsersModule {}