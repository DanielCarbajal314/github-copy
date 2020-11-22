import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CommitHistoryQueryResponse } from '../src/domain/queries/commit-history/commit-history.query.respose';
import { PresentationModule } from '../src/presentation/presentation.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PresentationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/commits/history (GET)', () => {
    const owner = 'DanielCarbajal314';
    const repository = 'github-copy';
    return request(app.getHttpServer())
      .get(`/commits/history?username=${owner}&repository=${repository}`)
      .expect(200)
      .expect(request => {
        const body: CommitHistoryQueryResponse[] = request.body;
        expect(body.length).toBeGreaterThan(0);
        const firtsCommit = body[body.length - 1 ];
        expect(firtsCommit.id).toBe('MDY6Q29tbWl0MzE0OTI1NDE5OjdhNGIyYmU3NGI3ZmQwNTZhMzRiMWFjYjIyODYyYzZlMWVhMGY0MDg=');
        expect(firtsCommit.author).toBe('dcarbajal');
        expect(firtsCommit.date).toBe('2020-11-21T23:51:33.000Z');
        expect(firtsCommit.avatarSrc).toBe('https://avatars0.githubusercontent.com/u/20676030?v=4');        
        expect(firtsCommit.message).toBe('Adding angular and its container');
        console.log(body);
      });
  });
});
