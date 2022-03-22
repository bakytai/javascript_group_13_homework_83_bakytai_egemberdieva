import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistsAlbumsComponent } from './artists-albums/artists-albums.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './login/login.component';
import { TracksComponent } from './tracks/tracks.component';
import { TrackHistoryComponent } from './track-history/track-history.component';
import { EditArtistsComponent } from './artists/edit-artists/edit-artists.component';
import { EditAlbumsComponent } from './artists-albums/edit-albums/edit-albums.component';
import { EditTracksComponent } from './tracks/edit-tracks/edit-tracks.component';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'artist/:id', component: ArtistsAlbumsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'tracks/:id', component: TracksComponent},
  {path: 'trackHistory', component: TrackHistoryComponent},
  {path: 'new/artist', component: EditArtistsComponent},
  {path: 'new/album', component: EditAlbumsComponent},
  {path: 'new/track', component: EditTracksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
