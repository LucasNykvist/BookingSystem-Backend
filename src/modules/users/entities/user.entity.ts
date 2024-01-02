import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  encryptPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    console.log(salt);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}
