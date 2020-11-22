import { Observable } from "rxjs";
import { CommitEvent } from "./dto/commit-history.model";

export interface IGitHubAPI {
    getRepositoryCommits(owner:string, repository:string) : Observable<CommitEvent[]>
}