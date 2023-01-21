import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { UserController } from './user.controller';
import { RolesGuard } from '../../auth/guards/roles.guards';

describe('UsersController', () => {
  let controller: UserController;

  const mockUserService = {
    getUsers: jest.fn((x) => x),
    getUserById: jest.fn((x) => x),
    createUser: jest.fn((x) => x),
    update: jest.fn((x) => x),
    updatePassword: jest.fn((x) => x),
  };

  beforeEach(async () => {
    const mock_RolesGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UsersService, useValue: mockUserService }],
    })
      .overrideGuard(RolesGuard)
      .useValue(mock_RolesGuard)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
