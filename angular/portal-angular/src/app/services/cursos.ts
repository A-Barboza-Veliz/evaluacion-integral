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
  private apiUrl = 'http://localhost:3000/api/cursos';

  // 📋 OBTENER todos los cursos
  getCurso(): Observable<CursosModel[]> {
    return this.http.get<CursosModel[]>(this.apiUrl);
  }
  
  // ➕ CREAR un nuevo curso (usa Partial para no requerir _id)
  crearCurso(curso: Partial<CursosModel>): Observable<CursosModel> {
    return this.http.post<CursosModel>(this.apiUrl, curso);
  }

  // ✏️ ACTUALIZAR un curso existente
  actualizarCurso(id: string, curso: Partial<CursosModel>): Observable<CursosModel> {
    return this.http.put<CursosModel>(`${this.apiUrl}/${id}`, curso);
  }

  // 🗑️ ELIMINAR un curso
  eliminarCurso(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}