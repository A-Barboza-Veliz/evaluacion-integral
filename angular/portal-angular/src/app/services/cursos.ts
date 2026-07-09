//creo modelo que represente los datos que recibire, injectando hhtp cliente pueda acceder a coinsumir algun servicio


import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CursosModel {
  _id: string;
  curso: string;
  docente: string;
  categoria: string;
  inscritos: string;
  precio: string;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private http = inject(HttpClient);

  getCurso(): Observable<CursosModel[]> {
    return this.http.get<CursosModel[]>('http://localhost:3000/api/cursos');
  }
  
  // 🗑️ ELIMINAR curso por ID
  eliminarCurso(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/cursos/${id}`);
  }

  // Crear curso (opcional)
  crearCurso(curso: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/cursos', curso);
  }

  // Actualizar curso (opcional)
  actualizarCurso(id: string, curso: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/cursos/${id}`, curso);
  }

  
}