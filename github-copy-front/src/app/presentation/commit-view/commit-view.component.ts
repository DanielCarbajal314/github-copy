import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/core/components/base-component';
import { CommitHttpService } from 'src/app/core/services/http-services/commit-http.service';
import { CommitHistoryItem } from 'src/app/core/services/http-services/models/commit-history-item.model';
import { CommitStateService } from 'src/app/core/services/ui-states/commit-state.service';
import { LoadingState } from 'src/app/core/shared/models/loading-state.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-commit-view',
  templateUrl: './commit-view.component.html',
  styleUrls: ['./commit-view.component.scss']
})
export class CommitViewComponent extends BaseComponent implements OnInit {

  commitHistory: CommitHistoryItem[] = [];
  loadingState: LoadingState = { isLoading : false };
  commitHistoryQueryFormGroup = new FormGroup({
    username : new FormControl(environment.githubUser),    
    repository : new FormControl(environment.repositoryName)
  });

  constructor(private commitStateService: CommitStateService) {
    super();
  }

  ngOnInit(): void {
    console.log('hola')
    this.unsubscribeOnDestroy(this.commitStateService.commitHistoryItems$.subscribe(history => {
      this.commitHistory = history
    }));
    this.unsubscribeOnDestroy(this.commitStateService.loadingState$.subscribe(loadingState => {
      this.loadingState = loadingState;
      loadingState.isLoading ? this.commitHistoryQueryFormGroup.disable():this.commitHistoryQueryFormGroup.enable();
    }));
    this.queryRepositoryHistory();
  }

  queryRepositoryHistory() {
    const { username, repository} = this.commitHistoryQueryFormGroup.value;
    this.commitStateService.getHistoryFromServer({ username: username, repository: repository});
  }
}
