import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async createUser(
    email: string,
    password: string,
    role: UserRole = UserRole.USER,
  ): Promise<User> {
    const user = this.usersRepo.create({ email, password, role });
    return this.usersRepo.save(user);
  }
}
