// components/estudiantes/estudiantes.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosService } from '../../services/cursos';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudiantes.html',
  styleUrls: ['./estudiantes.css']
})
export class EstudiantesComponent implements OnInit {
  estudiantes = signal<any[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  filtro = signal<string>('');
  usuarioActual: any = null;

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    // Verificar si es admin
    const userData = localStorage.getItem('usuario');
    if (userData) {
      this.usuarioActual = JSON.parse(userData);
      if (this.usuarioActual.rol !== 'admin') {
        window.location.href = '/dashboard';
        return;
      }
    }

    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.cursosService.getEstudiantes().subscribe({
      next: (data: any) => {
        console.log('📥 Estudiantes recibidos:', data);
        this.estudiantes.set(data);
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('❌ Error al cargar estudiantes:', error);
        this.error.set('Error al cargar los estudiantes');
        this.loading.set(false);
      }
    });
  }

  getEstudiantesFiltrados(): any[] {
    const filtro = this.filtro().toLowerCase();
    if (!filtro) return this.estudiantes();
    return this.estudiantes().filter(est => 
      est.nombre.toLowerCase().includes(filtro) ||
      est.correo.toLowerCase().includes(filtro)
    );
  }

  getTotalEstudiantes(): number {
    return this.estudiantes().length;
  }
}