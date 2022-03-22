import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Directive({
  selector: '[appPublish]'
})
export class PublishDirective implements OnInit, OnDestroy{
  userSub!: Subscription;
  user: Observable<null | User>;
  @Input('appPublish') publish!: boolean;
  @Input('appPublishElse') elseTemplate?: TemplateRef<any>;

  constructor(
    private templateRef: TemplateRef<any>,
    private store: Store<AppState>,
    private viewContainer: ViewContainerRef) {
    this.user = store.select(state => state.users.user)
  }

  ngOnInit() {
    this.userSub = this.user.subscribe(user => {
      this.viewContainer.clear();

      if (!this.publish) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if (this.elseTemplate) {
        this.viewContainer.createEmbeddedView(this.elseTemplate);
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
