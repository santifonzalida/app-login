import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getUsers() {
    const usersCollection = this.userModel.find().exec();
    return usersCollection;
  }

  getUserById(id: string) {
    const user = this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario ${id} no encontrado.`);
    }
    return user;
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async createUser(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    try {
      const user = await newUser.save();
      const { password, ...res } = user.toJSON();
      return res;
    } catch (error) {
      const msg =
        error.code === 11000
          ? 'The email address already exists in the database'
          : '';
      throw new BadRequestException(msg);
    }
  }
}
