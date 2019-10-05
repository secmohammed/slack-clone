import { ObjectID } from 'typeorm';

export interface UserDTO {
  id: ObjectID;
  name: string;
  readonly password: string;
  created_at: Date;
}

export interface AuthToken {
  id: ObjectID;
}
