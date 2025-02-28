import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  db: Todo[];

  create(createTodoDto: CreateTodoDto) {
    this.db.push({
      id: this.db.length,
      ...createTodoDto,
      state: 'todo',
    });
  }

  findAll() {
    return this.db;
  }

  findOne(id: number) {
    return this.db.find((todo) => todo.id === id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    const newTodo = { ...todo, ...updateTodoDto };
    const idx = this.db.findIndex((todo) => todo.id === id);
    this.db.splice(idx, 1, newTodo);
  }

  remove(id: number) {
    const idx = this.db.findIndex((todo) => todo.id === id);
    this.db.splice(idx, 1);
  }
}
