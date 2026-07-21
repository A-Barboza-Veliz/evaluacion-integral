import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'estudiante' // Por defecto para el portal React
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await API.post('/auth/register', formData);
      setSuccess('¡Registro exitoso! Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h3 className="text-center fw-bold text-primary mb-3">Crear Cuenta</h3>
            
            {error && <div className="alert alert-danger py-2">{error}</div>}
            {success && <div className="alert alert-success py-2">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-warning w-100 btn-lg shadow-sm text-dark fw-bold mt-2">
                Registrarse 🚀
              </button>
            </form>

            <div className="text-center mt-3">
              <small className="text-muted">
                ¿Ya tienes una cuenta? <Link to="/login" className="text-primary fw-bold">Inicia sesión</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}