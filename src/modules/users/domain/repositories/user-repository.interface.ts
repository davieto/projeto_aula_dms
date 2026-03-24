export const USER_REPOSITORY = Symbol("USER_REPOSITORY");
import { User } from "../models/user.entity";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
}
