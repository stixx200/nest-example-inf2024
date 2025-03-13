import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(user);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: {},
    });
  }

  async readOne(id: number): Promise<User> {
    const result = await this.usersRepository.find({
      where: { id },
      relations: {},
    });
    if (!result[0]) {
      throw new NotFoundException();
    }
    return result[0];
  }

  async update(id: number, data: Partial<UpdateUserDto>) {
    return await this.usersRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
