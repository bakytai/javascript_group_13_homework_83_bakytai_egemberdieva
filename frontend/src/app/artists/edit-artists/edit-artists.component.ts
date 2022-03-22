import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { ArtistData } from '../../models/artist.model';
import { createArtistRequest } from '../../store/artist.actions';

@Component({
  selector: 'app-edit-artists',
  templateUrl: './edit-artists.component.html',
  styleUrls: ['./edit-artists.component.sass']
})
export class EditArtistsComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error: Observable<string | null>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.artists.createLoading);
    this.error = store.select(state => state.artists.createError);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const artistData: ArtistData = this.form.value;
    this.store.dispatch(createArtistRequest({artistData}))
  }
}
