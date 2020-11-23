import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpServiceBase } from '../../shared/services/base-http-service';
import { CommitHistoryItem } from './models/commit-history-item.model';
import { GetCommitHistory } from './models/get-commit-history.model';

@Injectable({
  providedIn: 'root'
})
export class CommitHttpService extends HttpServiceBase {
  

  constructor(private http: HttpClient) {
    super();
  }

  getHistory(request: GetCommitHistory): Observable<CommitHistoryItem[]> {
    const params = this.generateQueryParams(request);
    const transforDate = (item: CommitHistoryItem):CommitHistoryItem => ({ ...item, date: new Date(item.date)});
    return this.http.get<CommitHistoryItem[]>(`${this.baseEndPoint}/commits/history`, params)
      .pipe(
        map(array => {
            return array.map(transforDate)
        })
      );
  }


}
