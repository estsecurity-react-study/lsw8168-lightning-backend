import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRoles } from '../enums/user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.DEFALUT,
  })
  public role: UserRoles;
}

export default User;
