import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursosModel } from './cursos';

// 📊 Modelo para las estadísticas del dashboard
export interface DashboardStats {
  totalCursos: number;
  totalInscritos: number;
  cursosPorCategoria: {
    categoria: string;
    cantidad: number;
  }[];
  cursosMasPedidos: CursosModel[];
  cursosPorEstado: {
    estado: string;
    cantidad: number;
  }[];
  promedioPrecio: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/cursos';

  // 📊 Obtener estadísticas del dashboard
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
  }
}