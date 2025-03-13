import { Place } from '../entities/user.entity';

export class CreateUserDto {
  name: string;
  place: Place;
}
