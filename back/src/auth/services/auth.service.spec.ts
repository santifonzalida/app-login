import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../../mail/services/mail.service';
import { UsersService } from '../../users/services/users.service';
import { AuthService } from '../services/auth.service';

describe('Service', () => {
  let service: AuthService;

  const mockUsersService = {
    getUserById: jest.fn((x) => x),
    getUserByEmail: jest.fn((x) => x),
  };

  const mockJwtService = {
    sign: jest.fn((x) => x),
  };

  const mockMailService = {
    sendUserResetPasswordConfirmation: jest.fn((x) => x),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
