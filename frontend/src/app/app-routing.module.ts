import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistsAlbumsComponent } from './artists-albums/artists-albums.component';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'artist/:id', component: ArtistsAlbumsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
