import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const userWithHashedPassword = {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    };

    return this.userRepository.save(userWithHashedPassword);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async updateUser(
    id: number,
    updatedUser: Partial<User>,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new Error('fuck');
    }

    Object.assign(user, updatedUser);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (user) {
      await this.userRepository.remove(user);
    }
  }
}
