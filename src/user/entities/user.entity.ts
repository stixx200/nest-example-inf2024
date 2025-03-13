import { Todo } from 'src/todo/entities/todo.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zipCode: string;

  @Column()
  city: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Place, { cascade: true, eager: true })
  @JoinTable()
  place: Place;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
