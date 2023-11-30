import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import {
  CreateUserDto,
  UpdatePasswordUserDto,
  UpdateUserDto,
} from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getUsers() {
    const usersCollection = this.userModel.find().exec();
    return usersCollection;
  }

  async getUserById(id: string) {
    try {
      const user = await this.userModel.findById(id).select('+password');
      return user;
    } catch (err) {
      throw new NotFoundException(`User not found.`);
    }
  }

  getUserByEmail(email: string) {
    const user = this.userModel.findOne({ email }).select('+password').exec();
    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
    return user;
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
        error.code === 11000 ? 'The email address is already registered' : '';
      throw new BadRequestException(msg);
    }
  }

  async update(id, changes: UpdateUserDto) {
    try {
      const user = await this.userModel
        .findByIdAndUpdate(id, { $set: changes }, { new: true })
        .exec();
      if (user) {
        return user;
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new BadRequestException(
        'something go wrong!, contact the admin site.',
      );
    }
  }

  async updatePassword(id, changes: UpdatePasswordUserDto) {
    try {
      const user = await this.userModel
        .findByIdAndUpdate(
          id,
          { $set: { password: await bcrypt.hash(changes.password, 10) } },
          { new: true },
        )
        .exec();
      if (user) {
        return user;
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new BadRequestException(
        'something go wrong!, contact the admin site.',
      );
    }
  }
}
