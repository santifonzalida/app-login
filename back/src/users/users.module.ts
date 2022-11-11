import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UserController } from './controllers/user.controller';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { Post, PostSchema } from './entities/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [UserController, PostController],
  providers: [UsersService, PostService],
  exports: [UsersService],
})
export class UsersModule {}
