import { HttpModule, CacheModule, Module, CacheInterceptor  } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GitHubAPI } from '../infrastructure/external-services/git/git-hub-api';
import { CommitHistoryQueryHandler } from '../services/handlers/queries/commit-history.query.handler';
import { CommitsController } from './controller/commits/commits.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [
        CqrsModule,
        HttpModule,
        CacheModule.register({
            ttl: 60,
            max: 10, 
        })
    ],
    controllers: [
        CommitsController
    ],
    providers: [
        { provide: 'IGitHubAPI', useClass: GitHubAPI},
        CommitHistoryQueryHandler,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        }
    ]
})
export class PresentationModule {}
