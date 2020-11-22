import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CommitEvent } from "./dto/commit-history.model";
import { IGitHubAPI } from "./git-hub-api.interface";

@Injectable()
export class GitHubAPI implements IGitHubAPI {
    private readonly GIT_HUB_URL = 'https://api.github.com/repos'
    private readonly COMMITS_RESOURCE = 'commits';

    constructor(private httpService: HttpService) {}

    getRepositoryCommits(owner: string, repository: string): Observable<CommitEvent[]> {
        const commitsURL = `${this.GIT_HUB_URL}/${owner}/${repository}/${this.COMMITS_RESOURCE}`;
        return this.httpService.get<CommitEvent[]>(commitsURL).pipe(map(x => x.data))
    }
}