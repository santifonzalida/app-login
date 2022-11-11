import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePostDto } from '../dtos/post.dto';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  create(payload: CreatePostDto) {
    const post = new this.postModel(payload);
    return post.save();
  }
}
