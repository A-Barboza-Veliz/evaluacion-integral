// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioData = localStorage.getItem('usuario');
    
    if (token && usuarioData) {
      try {
        const usuario = JSON.parse(usuarioData);
        const usuarioEncoded = encodeURIComponent(usuarioData);
        
        const adminUrl = (process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:4200').replace(/\/$/, '');
        const studentUrl = (process.env.NEXT_PUBLIC_STUDENT_URL || 'http://localhost:4200').replace(/\/$/, '');

        if (usuario.rol === 'admin') {
          window.location.href = `${adminUrl}/dashboard?token=${token}&usuario=${usuarioEncoded}`;
        } else {
          window.location.href = `${studentUrl}/inicio?token=${token}&usuario=${usuarioEncoded}`;
        }
      } catch (error) {
        console.error('Error al parsear usuario:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  );
}