import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🎓 Portal Estudiante
        </Link>
        <div className="d-flex align-items-center gap-3">
          <Link className="btn btn-outline-light btn-sm" to="/">Catálogo</Link>
          
          {user ? (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/dashboard">Mis Cursos</Link>
              <span className="text-white small ms-2">Hola, <strong>{user.name || 'Estudiante'}</strong></span>
              <button onClick={handleLogout} className="btn btn-danger btn-sm">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link className="btn btn-light btn-sm text-primary fw-bold" to="/login">Iniciar Sesión</Link>
              <Link className="btn btn-warning btn-sm fw-bold" to="/register">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}