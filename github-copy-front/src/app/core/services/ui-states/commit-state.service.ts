import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { LoadingState } from '../../shared/models/loading-state.model';
import { CommitHttpService } from '../http-services/commit-http.service';
import { CommitHistoryItem } from '../http-services/models/commit-history-item.model';
import { GetCommitHistory } from '../http-services/models/get-commit-history.model';

@Injectable({
  providedIn: 'root'
})
export class CommitStateService {

  public readonly commitHistoryItems$ : Subject<CommitHistoryItem[]> = new ReplaySubject(1);
  public readonly loadingState$: Subject<LoadingState> = new ReplaySubject(1);

  constructor(private commitHttpService: CommitHttpService) { }

  getHistoryFromServer(request: GetCommitHistory): void {
    this.loadingState$.next({ isLoading : true, message: 'Loading Commit History ....'});
    this.commitHttpService
    .getHistory(request).subscribe(commitHistoryArray => {
      this.commitHistoryItems$.next(commitHistoryArray);
      this.loadingState$.next({ isLoading : false });
    });
  }
}
