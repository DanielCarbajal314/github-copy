import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { map } from 'rxjs/operators';
import { GitHubAPI } from './git-hub-api';
import { IGitHubAPI } from './git-hub-api.interface';

describe('AppController', () => {
  let gitHubAPI: IGitHubAPI;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        imports: [HttpModule],
        providers: [GitHubAPI],
    }).compile();
    gitHubAPI = app.get<IGitHubAPI>(GitHubAPI);
  });

  describe('GithubAPI', () => {
    it('Should get commit history for Daniel Carbajal', async () => {
        const owner = 'DanielCarbajal314';
        const repository = 'github-copy';
        const promise =  gitHubAPI
            .getRepositoryCommits(owner,repository)
            .pipe(map(commitEvents => {
                const firtsCommit = commitEvents[commitEvents.length - 1 ];
                expect(firtsCommit.author.login).toBe('DanielCarbajal314');
                expect(firtsCommit.author.avatar_url).toBe('https://avatars0.githubusercontent.com/u/20676030?v=4');
                return firtsCommit.sha;
            }))
            .toPromise();
            await expect(promise).resolves.toEqual('7a4b2be74b7fd056a34b1acb22862c6e1ea0f408');
    });
  });
});
