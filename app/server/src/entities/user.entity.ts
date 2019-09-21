import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    // unique: true,
    type: 'varchar',
    length: 255,
  })
  public email: string;
}
