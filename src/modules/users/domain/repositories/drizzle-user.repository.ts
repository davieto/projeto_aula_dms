import { Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "../../domain/repositories/user-repository.interface";
import { User } from "../../domain/models/user.entity";

@Injectable()
export class DrizzleUserRepository implements UserRepository {

  private users: User[] = []; // mock simples (sem banco por enquanto)

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async update(): Promise<void> {}
  async delete(): Promise<void> {}
  async findAll(): Promise<User[]> { return this.users; }
  async findById(): Promise<User | null> { return null; }
}