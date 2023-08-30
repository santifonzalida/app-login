import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UserController } from './controllers/user.controller';
import { Post, PostSchema } from './entities/post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PostService } from './services/post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UsersService, PostService],
  exports: [UsersService],
})
export class UsersModule {}
