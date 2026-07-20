import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosService } from '../../services/cursos';

@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docentes.html',
  styleUrls: ['./docentes.css']
})
export class DocentesComponent implements OnInit {
  // Lista de docentes (extraída de los cursos)
  docentes = signal<any[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cargarDocentes();
  }

  cargarDocentes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.cursosService.getCursos().subscribe({
      next: (data: any) => {
        const cursos = data.data || data;
        // Extraer docentes únicos de los cursos
        const docentesMap = new Map();
        cursos.forEach((curso: any) => {
          if (curso.docente && !docentesMap.has(curso.docente)) {
            docentesMap.set(curso.docente, {
              nombre: curso.docente,
              cursos: [],
              categoria: curso.categoria || 'General'
            });
          }
          // Agregar curso al docente
          const docente = docentesMap.get(curso.docente);
          if (docente) {
            docente.cursos.push(curso.curso);
          }
        });
        
        this.docentes.set(Array.from(docentesMap.values()));
        this.loading.set(false);
        console.log('👨‍🏫 Docentes cargados:', this.docentes().length);
      },
      error: (error: any) => {
        console.error('❌ Error al cargar docentes:', error);
        this.error.set('Error al cargar los docentes');
        this.loading.set(false);
      }
    });
  }
}