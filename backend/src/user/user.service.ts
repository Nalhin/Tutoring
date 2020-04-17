import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRegisterInput } from '../auth/input/user-register.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  save(user: UserRegisterInput): Promise<User> {
    return this.usersRepository.save(user);
  }

  findAll(properties?: Partial<User>): Promise<User[]> {
    return this.usersRepository.find(properties);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  async remove(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ id });
    return this.usersRepository.remove(user);
  }
}