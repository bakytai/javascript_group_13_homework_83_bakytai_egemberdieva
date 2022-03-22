import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';

@Component({
  selector: 'app-edit-albums',
  templateUrl: './edit-albums.component.html',
  styleUrls: ['./edit-albums.component.sass']
})
export class EditAlbumsComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error: Observable<string | null>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.albums.createLoading);
    this.error = store.select(state => state.albums.createError);
  }

  ngOnInit(): void {
  }

}
