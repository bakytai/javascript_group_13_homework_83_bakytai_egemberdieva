import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistsAlbumsComponent } from './artists-albums/artists-albums.component';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { artistsReducer } from './store/artist.reducer';
import { albumsReducer } from './store/album.reducer';
import { ArtistEffects } from './store/artist.effects';
import { AlbumEffects } from './store/album.effects';
import { HttpClientModule } from '@angular/common/http';
import { ImagePipe } from './pipe/image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ArtistsComponent,
    ArtistsAlbumsComponent,
    ImagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({artists: artistsReducer, albums: albumsReducer}, {}),
    EffectsModule.forRoot([ArtistEffects, AlbumEffects]),
    MatButtonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    FlexModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
