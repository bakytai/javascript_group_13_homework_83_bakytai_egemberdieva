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
import { RegisterComponent } from './pages/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ValidateIdenticalDirective } from './directives/validate-identical.directive';
import { FileInputComponent } from '../ui/file-input/file-input.component';
import { userReducer } from './store/user.reducer';
import { UsersEffects } from './store/user.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ValidateIdenticalDirective,
    ToolbarComponent,
    ArtistsComponent,
    ArtistsAlbumsComponent,
    FileInputComponent,
    ImagePipe,
    RegisterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({artists: artistsReducer, albums: albumsReducer, users: userReducer},
          {}),
        EffectsModule.forRoot([ArtistEffects, AlbumEffects, UsersEffects]),
        MatButtonModule,
        MatToolbarModule,
        MatButtonToggleModule,
        FlexModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
