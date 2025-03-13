import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('users/:userId/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(
    @Param('userId') userId: string,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todoService.create(createTodoDto, +userId);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.todoService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Param('userId') userId: string, @Param('id') id: string) {
    return this.todoService.findOne(+id, +userId);
  }

  @Patch(':id')
  update(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(+id, updateTodoDto, +userId);
  }

  @Delete(':id')
  remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.todoService.remove(+id, +userId);
  }
}
