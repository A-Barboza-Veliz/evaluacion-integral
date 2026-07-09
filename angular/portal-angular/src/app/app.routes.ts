// app.routes.ts
import { Routes } from '@angular/router';
import { Cursos } from './components/cursos/cursos';

export const routes: Routes = [
    { path: 'cursos', component: Cursos },
    { path: '', redirectTo: 'validar', pathMatch: 'full' }    
   
    
];