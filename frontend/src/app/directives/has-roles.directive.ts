import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective implements OnInit, OnDestroy{
  userSub!: Subscription;
  user: Observable<null | User>;
  @Input('appHasRoles') roles!: {role: string[], published: boolean};
  @Input('appHasRolesElse') elseTemplate?: TemplateRef<any>;

  constructor(
    private templateRef: TemplateRef<any>,
    private store: Store<AppState>,
    private viewContainer: ViewContainerRef) {
    this.user = store.select(state => state.users.user)
  }

  ngOnInit() {
    this.userSub = this.user.subscribe(user => {
      this.viewContainer.clear();

      if(user?.role === 'admin'){
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if((user?.role === 'user' && this.roles.published === true) || (!user && this.roles.published === true)){
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
