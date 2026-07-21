import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CursosService } from '../../services/cursos';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  // Estadísticas
  estadisticas = signal<any>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  
  // Usuario
  usuario: any = null;

  constructor(
    private router: Router,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    // Capturar token de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const usuarioParam = urlParams.get('usuario');

    if (token && usuarioParam) {
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', usuarioParam);
      window.history.replaceState({}, document.title, '/dashboard');
      console.log('✅ Token guardado desde URL');
    }

    // Verificar autenticación
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      const loginUrl = (typeof window !== 'undefined' && !window.location.hostname.includes('localhost'))
        ? 'https://evaluacion-integral-auth.vercel.app/login'
        : 'http://localhost:3001/login';
      window.location.href = loginUrl;
      return;
    }

    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      try {
        this.usuario = JSON.parse(usuarioData);
        console.log('👤 Usuario en Dashboard:', this.usuario);
      } catch (e) {
        console.error('Error al parsear usuario en Dashboard:', e);
      }
    }

    if (this.usuario?.rol !== 'admin') {
      this.error.set('⛔ Acceso denegado: No tienes permisos de Administrador para acceder a esta sección.');
      this.loading.set(false);
      return;
    }

    // Cargar estadísticas
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.loading.set(true);
    this.error.set(null);

    this.cursosService.getEstadisticas().subscribe({
      next: (data: any) => {
        console.log('📊 Estadísticas recibidas:', data);
        this.estadisticas.set(data);
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('❌ Error al cargar estadísticas:', error);
        this.error.set('Error al cargar las estadísticas');
        this.loading.set(false);
      }
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    const loginUrl = (typeof window !== 'undefined' && !window.location.hostname.includes('localhost'))
      ? 'https://evaluacion-integral-auth.vercel.app/login'
      : 'http://localhost:3001/login';
    window.location.href = loginUrl;
  }

  // ========== FUNCIONES AUXILIARES ==========

  // Total de cursos
  getTotalCursos(): number {
    return this.estadisticas()?.totalCursos || 0;
  }

  // Total de inscritos
  getTotalInscritos(): number {
    return this.estadisticas()?.totalInscritos || 0;
  }

  // Precio promedio
  getPromedioPrecio(): number {
    return this.estadisticas()?.promedioPrecio || 0;
  }

  // Cursos por categoría
  getCursosPorCategoria(): any[] {
    return this.estadisticas()?.cursosPorCategoria || [];
  }

  // Cursos más populares
  getCursosMasPedidos(): any[] {
    return this.estadisticas()?.cursosMasPedidos || [];
  }

  // Cursos por estado
  getCursosPorEstado(): any[] {
    return this.estadisticas()?.cursosPorEstado || [];
  }

  // Color según categoría (para gráfico de barras)
  getColorCategoria(categoria: string): string {
    const colores: { [key: string]: string } = {
      'Frontend': '#3b82f6',
      'Backend': '#8b5cf6',
      'Full Stack': '#ec4899',
      'Seguridad': '#ef4444',
      'Datos': '#10b981',
      'IA': '#f59e0b',
      'DevOps': '#06b6d4',
      'Diseño': '#f472b6'
    };
    return colores[categoria] || '#6b7280';
  }

  // Color según estado (para los dots)
  getColorEstado(estado: string): string {
    const colores: { [key: string]: string } = {
      'Activo': '#10b981',
      'Inactivo': '#ef4444',
      'Borrador': '#f59e0b'
    };
    return colores[estado] || '#6b7280';
  }
}