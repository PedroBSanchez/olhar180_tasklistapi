import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { hashSync } from 'bcryptjs';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
