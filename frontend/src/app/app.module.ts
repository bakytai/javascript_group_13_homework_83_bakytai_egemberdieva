import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistsAlbumsComponent } from './artists-albums/artists-albums.component';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ImagePipe } from './pipe/image.pipe';
import { RegisterComponent } from './pages/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ValidateIdenticalDirective } from './directives/validate-identical.directive';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { TracksComponent } from './tracks/tracks.component';
import { MatListModule } from '@angular/material/list';
import { TrackHistoryComponent } from './track-history/track-history.component';
import { AppStoreModule } from './app-store.module';
import { EditTracksComponent } from './tracks/edit-tracks/edit-tracks.component';
import { EditAlbumsComponent } from './artists-albums/edit-albums/edit-albums.component';
import { EditArtistsComponent } from './artists/edit-artists/edit-artists.component';
import { MatSelectModule } from '@angular/material/select';
import { AuthInterceptor } from './auth.interceptor';
import { HasRolesDirective } from './directives/has-roles.directive';
import { UserTypeDirective } from './directives/user-type.directive';

@NgModule({
  declarations: [
    AppComponent,
    ValidateIdenticalDirective,
    ToolbarComponent,
    ArtistsComponent,
    ArtistsAlbumsComponent,
    FileInputComponent,
    ImagePipe,
    RegisterComponent,
    LoginComponent,
    CenteredCardComponent,
    TracksComponent,
    TrackHistoryComponent,
    EditTracksComponent,
    EditAlbumsComponent,
    EditArtistsComponent,
    HasRolesDirective,
    UserTypeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    FlexModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    AppStoreModule,
    MatSelectModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
