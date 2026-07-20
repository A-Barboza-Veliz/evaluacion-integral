import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estudiantes-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudiantes-inicio.html',
  styleUrls: ['./estudiantes-inicio.css']
})
export class EstudiantesInicioComponent implements OnInit {
  usuario: any = null;

  ngOnInit(): void {
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      this.usuario = JSON.parse(usuarioData);
      console.log('👤 Estudiante:', this.usuario);
    }
  }
}