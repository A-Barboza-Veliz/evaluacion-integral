import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosService } from '../../services/cursos';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class CursosComponent implements OnInit {
  // Signals para el estado reactivo
  cursos = signal<any[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Signal para el formulario de nuevo curso
  nuevoCurso = signal({
    curso: '',
    docente: '',
    categoria: '',
    inscritos: 0,
    precio: 0,
    estado: 'Activo'
  });

  // Signal para edición
  cursoEditando = signal<any | null>(null);
  mostrarFormularioEdicion = signal<boolean>(false);

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    console.log('🔄 Iniciando carga de cursos...');
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.loading.set(true);
    this.error.set(null);
    
    console.log('📡 Llamando a la API...');
    this.cursosService.getCursos().subscribe({
      next: (data: any) => {
        console.log('📦 Datos recibidos:', data);
        // La API devuelve un array directamente o con propiedad "data"
        const cursosData = data.data || data;
        this.cursos.set(cursosData);
        this.loading.set(false);
        console.log('✅ Cursos cargados:', this.cursos().length);
      },
      error: (error: any) => {
        console.error('❌ Error al cargar cursos:', error);
        this.error.set('Error al cargar los cursos');
        this.loading.set(false);
      }
    });
  }

  // ✅ Funciones para el formulario de nuevo curso
  actualizarNuevoCurso(campo: string, valor: any): void {
    this.nuevoCurso.update(curr => ({ ...curr, [campo]: valor }));
  }

  limpiarFormulario(): void {
    this.nuevoCurso.set({
      curso: '',
      docente: '',
      categoria: '',
      inscritos: 0,
      precio: 0,
      estado: 'Activo'
    });
  }

  guardarNuevoCurso(): void {
    const curso = this.nuevoCurso();
    if (!curso.curso || !curso.docente) {
      alert('⚠️ Los campos "Curso" y "Docente" son obligatorios');
      return;
    }

    console.log('📤 Creando curso:', curso);
    this.cursosService.crearCurso(curso).subscribe({
      next: () => {
        alert('✅ Curso creado correctamente');
        this.limpiarFormulario();
        this.cargarCursos();
      },
      error: (error: any) => {
        console.error('❌ Error al crear curso:', error);
        alert('❌ Error al crear el curso');
      }
    });
  }

  // ✅ Funciones para eliminar
  eliminarCurso(id: string, nombre: string): void {
    if (!confirm(`¿Estás seguro de eliminar el curso "${nombre}"?`)) return;

    console.log('🗑️ Eliminando curso:', id);
    this.cursosService.eliminarCurso(id).subscribe({
      next: () => {
        alert('✅ Curso eliminado correctamente');
        this.cargarCursos();
      },
      error: (error: any) => {
        console.error('❌ Error al eliminar:', error);
        alert('❌ Error al eliminar el curso');
      }
    });
  }

  // ✅ Funciones para editar
  abrirEditar(curso: any): void {
    this.cursoEditando.set({ ...curso });
    this.mostrarFormularioEdicion.set(true);
  }

  cerrarEditar(): void {
    this.cursoEditando.set(null);
    this.mostrarFormularioEdicion.set(false);
  }

  actualizarCampo(campo: string, valor: any): void {
    this.cursoEditando.update(curr => ({ ...curr, [campo]: valor }));
  }

  guardarEdicion(): void {
    const curso = this.cursoEditando();
    if (!curso) return;

    console.log('📤 Actualizando curso:', curso);
    this.cursosService.actualizarCurso(curso._id, curso).subscribe({
      next: () => {
        alert('✅ Curso actualizado correctamente');
        this.cerrarEditar();
        this.cargarCursos();
      },
      error: (error: any) => {
        console.error('❌ Error al actualizar:', error);
        alert('❌ Error al actualizar el curso');
      }
    });
  }
}