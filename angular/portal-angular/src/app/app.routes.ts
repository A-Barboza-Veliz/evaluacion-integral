import { Routes } from '@angular/router';
import { Cursos } from './components/cursos/cursos';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // ← Redirige a dashboard
  { path: 'dashboard', component: DashboardComponent },        // ← NUEVA RUTA
  { path: 'cursos', component: Cursos },
];