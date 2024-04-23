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

  getUsersByFilter(year: number) {
    return this.userModel.aggregate(
      [
        {
          $match: {
            created: {
              $gte: new Date(year, 0, 1),
              $lt: new Date(year + 1, 0, 1),
            },
          },
        },
        {
          $group: {
            _id: { $month: '$created' },
            total: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ],
      (error) => {
        if (error) {
          console.error('Error al obtener usuario', error.message);
        }
      },
    );
  }

  getLikedProducts(limit: number) {
    return this.userModel.aggregate([
      { $unwind: '$productsLikes' },
      { $group: { _id: '$productsLikes', total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: limit }
    ]);
  }

  async getUserById(id: string) {
    try {
      const user = await this.userModel.findById(id).select('-password');
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

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
