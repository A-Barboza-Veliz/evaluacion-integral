import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { CursosComponent } from './components/cursos/cursos';
import { DocentesComponent } from './components/docentes/docentes';
import { EstudiantesComponent } from './components/estudiantes/estudiantes';
import { EstudiantesInicioComponent } from './components/estudiantes-inicio/estudiantes-inicio';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: EstudiantesInicioComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'docentes', component: DocentesComponent },
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: '**', redirectTo: '/inicio' }
];