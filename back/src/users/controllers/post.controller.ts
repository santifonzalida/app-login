import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from '../dtos/post.dto';
import { PostService } from '../services/post.service';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createPost(@Body() payload: CreatePostDto) {
    return this.postService.create(payload);
  }
}
