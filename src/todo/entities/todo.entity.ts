import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  name: string;

  @Column({
    type: 'text',
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
  })
  state: 'todo' | 'in-progress' | 'done';
}
