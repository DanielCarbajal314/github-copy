import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty } from 'class-validator';

export class CommitHistoryQuery implements ICommand  {
    @IsNotEmpty()
    public readonly username:string;
    @IsNotEmpty()
    public readonly repository:string;
}