import { HttpModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GitHubAPI } from '../infrastructure/external-services/git/git-hub-api';
import { CommitHistoryQueryHandler } from '../services/handlers/queries/commit-history.query.handler';
import { CommitsController } from './controller/commits/commits.controller';

@Module({
    imports: [
        CqrsModule,
        HttpModule
    ],
    controllers: [
        CommitsController
    ],
    providers: [
        { provide: 'IGitHubAPI', useClass: GitHubAPI},
        CommitHistoryQueryHandler
    ]
})
export class PresentationModule {}
