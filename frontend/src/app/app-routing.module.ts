import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistsAlbumsComponent } from './artists-albums/artists-albums.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'artist/:id', component: ArtistsAlbumsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
