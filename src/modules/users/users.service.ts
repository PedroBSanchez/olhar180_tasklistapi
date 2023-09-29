import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'username'],
    });
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async store(data: CreateUserDto) {
    const userInDb = await this.findByUsername(data.username);

    if (userInDb) {
      throw new BadRequestException('Usuário já cadastrado');
    }

    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }
}
