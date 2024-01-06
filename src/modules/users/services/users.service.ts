import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

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
    const foundUser = await this.userRepository.findOneBy({ id: id });

    const foundUserWithoutPassword = {
      ...foundUser,
      password: undefined,
    };

    return foundUserWithoutPassword;
  }

  async login(user: User): Promise<any> {
    const userFromDb = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (!userFromDb) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      userFromDb.password,
    );

    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect');
    }

    const token = jwt.sign(
      { id: userFromDb.id, email: userFromDb.email },
      process.env.JWT_SECRET,
    );

    const returnInformation = {
      id: userFromDb.id,
      email: userFromDb.email,
      token: token,
    };

    return returnInformation;
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
