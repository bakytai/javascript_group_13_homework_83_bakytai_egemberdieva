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
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'artist/:id', component: ArtistsAlbumsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'tracks/:id', component: TracksComponent},
  {path: 'trackHistory', component: TrackHistoryComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}},
  {path: 'new/artist', component: EditArtistsComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}},
  {path: 'new/album', component: EditAlbumsComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}},
  {path: 'new/track', component: EditTracksComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
