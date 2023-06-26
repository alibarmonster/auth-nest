import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { CreateUserDto } from 'src/user/dto';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(userDto: CreateUserDto) {
    const hash = await argon.hash(userDto.password);
    try {
      const user = await this.userRepository.save({
        username: userDto.username,
        email: userDto.email,
        password: hash,
      });

      delete user.password;

      return user;
    } catch (error) {
      if ((error.code = '23505')) {
        throw new ConflictException(
          'username and email has already been taken',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
