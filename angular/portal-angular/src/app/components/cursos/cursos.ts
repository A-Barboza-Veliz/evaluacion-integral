import { Component, inject, OnInit, signal } from '@angular/core';
import { CursosModel, CursosService } from '../../services/cursos';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
})
export class Cursos implements OnInit {
  cursos = signal<CursosModel[]>([]);

  // Variables para el formulario de edición
  cursoEditando = signal<CursosModel | null>(null);
  mostrarFormularioEdicion = signal<boolean>(false);

  // 🆕 VARIABLES PARA EL FORMULARIO DE CREAR
  nuevoCurso = {
    curso: '',
    docente: '',
    categoria: '',
    inscritos: '0',
    precio: '0',
    estado: 'Activo'
  };

  private cursoService = inject(CursosService);

  ngOnInit(): void {
    this.cursoService.getCurso().subscribe({
      next: (data) => {
        console.log('Cursos recibidos:', data);
        this.cursos.set(data);
      },
      error: (error) => {
        console.error('Error al obtener cursos:', error);
      }
    });
  }

  // ============================================
  // 🗑️ ELIMINAR curso
  // ============================================
  eliminarCurso(id: string, nombre: string): void {
    if (confirm(`¿Estás seguro de eliminar el curso "${nombre}"?`)) {
      this.cursoService.eliminarCurso(id).subscribe({
        next: () => {
          this.cursos.update(cursos => cursos.filter(curso => curso._id !== id));
          alert('✅ Curso eliminado correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('❌ Error al eliminar el curso');
        }
      });
    }
  }

  // ============================================
  // ✏️ MÉTODOS PARA EDITAR
  // ============================================

  // ✏️ ABRIR formulario de edición
  abrirEditar(curso: CursosModel): void {
    this.cursoEditando.set({ ...curso });
    this.mostrarFormularioEdicion.set(true);
  }

  // ✏️ CERRAR formulario de edición
  cerrarEditar(): void {
    this.cursoEditando.set(null);
    this.mostrarFormularioEdicion.set(false);
  }

  // ✏️ GUARDAR cambios
  guardarEdicion(): void {
    const curso = this.cursoEditando();
    if (!curso) return;

    this.cursoService.actualizarCurso(curso._id, curso).subscribe({
      next: (cursoActualizado) => {
        this.cursos.update(cursos =>
          cursos.map(c => c._id === curso._id ? cursoActualizado : c)
        );
        alert('✅ Curso actualizado correctamente');
        this.cerrarEditar();
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('❌ Error al actualizar el curso');
      }
    });
  }

  // ✏️ Actualizar los campos del formulario de edición
  actualizarCampo(campo: keyof CursosModel, valor: string): void {
    const curso = this.cursoEditando();
    if (curso) {
      curso[campo] = valor;
      this.cursoEditando.set({ ...curso });
    }
  }

  // ============================================
  // 🆕 MÉTODOS PARA CREAR (NUEVO)
  // ============================================

  // 🆕 LIMPIAR formulario de crear
  limpiarFormulario(): void {
    this.nuevoCurso = {
      curso: '',
      docente: '',
      categoria: '',
      inscritos: '0',
      precio: '0',
      estado: 'Activo'
    };
    // Desplazar la vista al formulario
    const formulario = document.querySelector('.card .card-header');
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // 🆕 ACTUALIZAR campo del nuevo curso
  actualizarNuevoCurso(campo: string, valor: string): void {
    this.nuevoCurso = {
      ...this.nuevoCurso,
      [campo]: valor
    };
  }

  // 🆕 GUARDAR nuevo curso
  guardarNuevoCurso(): void {
    // Validar campos obligatorios
    if (!this.nuevoCurso.curso.trim() || !this.nuevoCurso.docente.trim()) {
      alert('⚠️ Los campos "Curso" y "Docente" son obligatorios');
      return;
    }

    this.cursoService.crearCurso(this.nuevoCurso).subscribe({
      next: (cursoCreado) => {
        console.log('✅ Curso creado:', cursoCreado);
        alert('✅ Curso creado exitosamente');
        // Agregar el nuevo curso a la lista local
        this.cursos.update(cursos => [...cursos, cursoCreado]);
        this.limpiarFormulario();
      },
      error: (error) => {
        console.error('❌ Error al crear curso:', error);
        alert('❌ Error al crear el curso. Verifica la conexión con el servidor.');
      }
    });
  }
}