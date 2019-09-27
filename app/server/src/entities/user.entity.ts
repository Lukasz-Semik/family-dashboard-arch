import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 255,
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public password: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public lastName: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: string;
}
