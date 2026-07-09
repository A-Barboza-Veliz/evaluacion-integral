//implementando de angular core on init , para decilre que me conectare a un serrvicioo y esperare respuestas
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
  // 🗑️ ELIMINAR curso
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

   // ✏️ ABRIR formulario de edición
  abrirEditar(curso: CursosModel): void {
    this.cursoEditando.set({ ...curso }); // Copia los datos del curso
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
        // Actualizar la lista local con los cambios
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

  // ✏️ Actualizar los campos del formulario
  actualizarCampo(campo: keyof CursosModel, valor: string): void {
    const curso = this.cursoEditando();
    if (curso) {
      curso[campo] = valor;
      this.cursoEditando.set({ ...curso });
    }
  }
}
  
  
