import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CommitHistoryQuery } from '../../../domain/queries/commit-history/commit-history.query';
import { CommitHistoryQueryResponse } from '../../../domain/queries/commit-history/commit-history.query.respose';

@Controller('commits')
export class CommitsController {

    constructor(private queryBus: QueryBus) {}

    @Get('/history')
    @UsePipes(new ValidationPipe({ transform: true }))
    getHistory(@Query()query: CommitHistoryQuery): Promise<CommitHistoryQueryResponse[]> {
        return this.queryBus.execute(query);  
    }
}

