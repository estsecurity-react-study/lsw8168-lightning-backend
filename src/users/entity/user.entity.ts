import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { UserRoles } from '../enums/user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Transform((params) => params.value.trim())
  @Column({ unique: true, nullable: true })
  email: string | null;

  @Transform((params) => params.value.trim())
  @Column({ nullable: true })
  name: string | null;

  @Transform((params) => params.value.trim())
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.DEFALUT,
  })
  role?: UserRoles | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Exclude()
  @Column({ nullable: true })
  twoFactorAuthenticationSecret?: string;

  @Column({ default: false })
  isTwoFactorAuthenticationEnabled: boolean;
}

export default User;
