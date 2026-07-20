// app/login/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }),
      });

      const data = await res.json();
      console.log('📥 Respuesta del login:', data);

      if (!res.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // Guardar token y usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      console.log('✅ Token guardado:', localStorage.getItem('token'));
      console.log('✅ Usuario guardado:', localStorage.getItem('usuario'));

      // ✅ REDIRECCIÓN SEGÚN ROL
      const usuario = data.usuario;
      const usuarioEncoded = encodeURIComponent(JSON.stringify(usuario));

      if (usuario.rol === 'admin') {
        // Admin → Dashboard
        window.location.href = `http://localhost:4200/dashboard?token=${data.token}&usuario=${usuarioEncoded}`;
      } else {
        // Estudiante → Inicio
        window.location.href = `http://localhost:4200/inicio?token=${data.token}&usuario=${usuarioEncoded}`;
      }

    } catch (error) {
      console.error('❌ Error:', error);
      setErrorMsg(error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@test.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}