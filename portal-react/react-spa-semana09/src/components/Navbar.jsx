import { Link } from 'react-router-dom';
import './Navbar.css'; // Si tienes este archivo, si no, puedes eliminar la importación

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🏫</span>
          Portal del Alumno
        </Link>
        <div className="nav-links">
          <span className="nav-user">👤 Estudiante</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;