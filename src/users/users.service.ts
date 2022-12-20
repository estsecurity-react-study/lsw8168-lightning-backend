import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import EditDto from 'src/authentication/dto/edit.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(userData: CreateUserDto) {
    const { email, password } = userData;
    return await this.usersRepository.update(
      { email },
      {
        password: password,
      },
    );
  }

  async emailCheck(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user !== null;
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException(
      '이메일이 존재하지 않습니다.',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async edit(editData: EditDto) {
    const { email, username } = editData;
    return await this.usersRepository.update(
      { email },
      {
        name: username,
      },
    );
  }
}
