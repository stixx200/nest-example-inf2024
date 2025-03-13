import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    const user = await this.userService.readOne(userId);
    const todo = new Todo();
    todo.user = user;
    todo.name = createTodoDto.name;
    todo.state = createTodoDto.state;
    const created = await this.todoRepository.save(todo);
    return created.id;
  }

  async findAll(userId: number) {
    const user = await this.userService.readOne(userId);
    return await this.todoRepository.findBy({ user });
  }

  async findOne(id: number, userId: number) {
    const user = await this.userService.readOne(userId);
    const result = await this.todoRepository.findOneBy({ user, id });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, userId: number) {
    const todo = await this.findOne(id, userId);
    Object.assign(todo, updateTodoDto);
    await this.todoRepository.save(todo);
  }

  async remove(id: number, userId: number) {
    const result = await this.todoRepository.delete({
      id,
      user: { id: userId },
    });
    if (!result.affected || result.affected < 1) {
      throw new NotFoundException();
    }
  }
}
