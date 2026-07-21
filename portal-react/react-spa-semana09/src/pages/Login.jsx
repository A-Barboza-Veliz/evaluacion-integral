import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales incorrectas');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h3 className="text-center fw-bold text-primary mb-3">Iniciar Sesión</h3>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 btn-lg shadow-sm mt-2">
                Ingresar 🚀
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}