import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'listMascotas', pathMatch: 'full' },
  { path:'home', component: HomeComponent},
  { path:'character-list', component: CharacterListComponent },
  { path:'character-details/:id', component: CharacterDetailsComponent },
  { path: '**',  redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
