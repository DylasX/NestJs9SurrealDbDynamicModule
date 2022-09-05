import { Test, TestingModule } from '@nestjs/testing';
import { SurrealDbService } from './surrealdb.service';
import { SURREALDB_CONFIG_OPTIONS } from './constants';

jest.mock('dotenv');
jest.mock('fs');

describe('SurrealDbService', () => {
  let service: SurrealDbService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        SurrealDbService,
        {
          provide: SURREALDB_CONFIG_OPTIONS,
          useValue: {
            folder: 'config',
          },
        },
      ],
    }).compile();

    service = moduleRef.get<SurrealDbService>(SurrealDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
