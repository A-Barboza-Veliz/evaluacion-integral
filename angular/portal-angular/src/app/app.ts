import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'portal-angular';
  usuario: any = null;

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const usuarioParam = urlParams.get('usuario');

    if (token && usuarioParam) {
      try {
        const decodedUser = decodeURIComponent(usuarioParam);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', decodedUser);
      } catch (e) {
        console.error('Error al decodificar usuarioParam:', e);
      }
    }

    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      try {
        this.usuario = JSON.parse(usuarioData);
        console.log('👤 Usuario en App:', this.usuario);
      } catch (e) {
        console.error('Error al parsear usuarioData:', e);
      }
    }
  }

  esAdmin(): boolean {
    return this.usuario?.rol === 'admin';
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    const loginUrl = (typeof window !== 'undefined' && !window.location.hostname.includes('localhost'))
      ? 'https://evaluacion-integral-auth.vercel.app/login'
      : 'http://localhost:3001/login';
    window.location.href = loginUrl;
  }
}