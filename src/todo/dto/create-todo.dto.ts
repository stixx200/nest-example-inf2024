export class CreateTodoDto {
  name: string;
  state: 'todo' | 'in-progress' | 'done';
}
