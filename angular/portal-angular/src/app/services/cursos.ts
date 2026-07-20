// services/cursos.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtener headers con token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Listar cursos
  getCursos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos`);
  }

  // Obtener un curso por ID
  getCurso(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos/${id}`);
  }

  // Crear curso (requiere admin)
  crearCurso(curso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cursos`, curso, {
      headers: this.getHeaders()
    });
  }

  // Actualizar curso (requiere admin)
  actualizarCurso(id: string, curso: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cursos/${id}`, curso, {
      headers: this.getHeaders()
    });
  }

  // Eliminar curso (requiere admin)
  eliminarCurso(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cursos/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Estadísticas (requiere admin)
  getEstadisticas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos/stats`, {
      headers: this.getHeaders()
    });
  }

  // ✅ NUEVO: Obtener estudiantes (requiere admin)
  getEstudiantes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/estudiantes`, {
      headers: this.getHeaders()
    });
  }
}