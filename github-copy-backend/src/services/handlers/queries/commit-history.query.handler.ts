import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { CommitHistoryQuery } from '../../../domain/queries/commit-history/commit-history.query';
import { CommitHistoryQueryResponse } from '../../../domain/queries/commit-history/commit-history.query.respose';
import { IGitHubAPI } from '../../../infrastructure/external-services/git/git-hub-api.interface';
import { map } from 'rxjs/operators';

@QueryHandler(CommitHistoryQuery)
export class CommitHistoryQueryHandler implements IQueryHandler<CommitHistoryQuery, CommitHistoryQueryResponse[]> {

    constructor(@Inject('IGitHubAPI') private gitHubAPI: IGitHubAPI) { }

    execute(command: CommitHistoryQuery): Promise<CommitHistoryQueryResponse[]> {
        return this.gitHubAPI
            .getRepositoryCommits(command.username,command.repository)
            .pipe(map(commitEventsArray => {
                return commitEventsArray.map(commitEvent => ({
                    id: commitEvent.node_id,
                    message: commitEvent.commit.message,
                    author: commitEvent.commit.author.name,
                    avatarSrc: commitEvent.author.avatar_url,
                    date: new Date(commitEvent.commit.author.date)
                } as CommitHistoryQueryResponse));                
            }))
            .toPromise();
    }
}