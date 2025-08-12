import { Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component/details.component';
import { HomeComponent } from './components/home/home.component/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'car/:id', component: DetailsComponent },
  { path: '**', component: HomeComponent },
];
