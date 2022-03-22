import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-edit-tracks',
  templateUrl: './edit-tracks.component.html',
  styleUrls: ['./edit-tracks.component.sass']
})
export class EditTracksComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  albums: Observable<Album[]>;
  error: Observable<string | null>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.albums.createLoading);
    this.error = store.select(state => state.albums.createError);
    this.albums = store.select(state => state.albums.albums);
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
