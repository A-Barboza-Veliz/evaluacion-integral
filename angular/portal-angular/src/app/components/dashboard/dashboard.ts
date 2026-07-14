import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  stats = signal<DashboardStats | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  private dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.loading.set(true);
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        console.log('📊 Estadísticas:', data);
        this.stats.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.error.set('Error al cargar las estadísticas');
        this.loading.set(false);
      }
    });
  }

  getCategoriaColor(categoria: string): string {
    const colores: { [key: string]: string } = {
      'Frontend': '#3b82f6',
      'Backend': '#8b5cf6',
      'Full Stack': '#06b6d4',
      'Seguridad': '#ef4444',
      'DevOps': '#f59e0b'
    };
    return colores[categoria] || '#6b7280';
  }

  getEstadoColor(estado: string): string {
    const colores: { [key: string]: string } = {
      'Activo': '#22c55e',
      'Inactivo': '#ef4444',
      'Borrador': '#f59e0b'
    };
    return colores[estado] || '#6b7280';
  }

  getCategoriaIcon(categoria: string): string {
    const iconos: { [key: string]: string } = {
      'Frontend': '🎨',
      'Backend': '⚙️',
      'Full Stack': '🚀',
      'Seguridad': '🔒',
      'DevOps': '☁️'
    };
    return iconos[categoria] || '📚';
  }

  getCantidadPorEstado(estado: string): number {
    const estadoData = this.stats()?.cursosPorEstado?.find(e => e.estado === estado);
    return estadoData?.cantidad || 0;
  }
}