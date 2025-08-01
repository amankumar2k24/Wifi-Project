import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { beforeEach, describe, it } from 'node:test';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
