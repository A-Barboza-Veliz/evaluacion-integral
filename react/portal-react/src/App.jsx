import { useEffect, useState } from 'react';
import './index.css';

const API_URL = 'http://localhost:3000/api';

function App() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({ correo: '', password: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');

    const cargarDatos = async () => {
      try {
        if (token) {
          const resUsuario = await fetch(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (resUsuario.ok) {
            const dataUsuario = await resUsuario.json();
            if (dataUsuario.usuario) {
              setUsuario(dataUsuario.usuario);
            }
          }
        }

        const resCursos = await fetch(`${API_URL}/cursos`);
        if (!resCursos.ok) {
          throw new Error('La API no respondió');
        }

        const dataCursos = await resCursos.json();
        setCursos(Array.isArray(dataCursos) ? dataCursos : []);
      } catch (err) {
        setError(err.message || 'No se pudieron cargar los cursos');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo iniciar sesión');

      localStorage.setItem('token', data.token);
      setUsuario(data.usuario);
      setForm({ correo: '', password: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <h2>Portal Estudiante</h2>
        <ul>
          <li className="active">Inicio</li>
          <li>Cursos</li>
          <li>Inscripciones</li>
          <li>Mi Perfil</li>
        </ul>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <h1>{usuario ? `Bienvenido, ${usuario.nombre}` : 'Bienvenido'}</h1>
            <p>Gestiona tus cursos y matrículas desde aquí.</p>
          </div>
          {usuario ? (
            <button className="primary-btn" onClick={handleLogout}>Cerrar sesión</button>
          ) : (
            <button className="primary-btn">Nueva inscripción</button>
          )}
        </header>

        {!usuario ? (
          <section className="login-card">
            <h3>Inicia sesión</h3>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Correo"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button type="submit" className="primary-btn">Entrar</button>
              {error ? <p className="error-text">{error}</p> : null}
            </form>
          </section>
        ) : null}

        <section className="stats-grid">
          <article className="card">
            <h3>Mis cursos</h3>
            <p>{cursos.length} cursos disponibles</p>
            <span className="badge">En progreso</span>
          </article>
          <article className="card">
            <h3>Inscripciones</h3>
            <p>{usuario ? 'Sesión activa' : 'Sin iniciar'}</p>
            <span className="badge">Seguras</span>
          </article>
          <article className="card">
            <h3>Estado</h3>
            <p>{error ? 'Sin conexión' : 'Todo al día'}</p>
            <span className="badge">Actualizado</span>
          </article>
        </section>

        <section className="table-card">
          <h3>Cursos disponibles</h3>
          {loading ? <p>Cargando cursos...</p> : null}
          {error ? <p className="error-text">{error}</p> : null}
          <table>
            <thead>
              <tr>
                <th>Curso</th>
                <th>Docente</th>
                <th>Categoría</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso._id || curso.id}>
                  <td>{curso.curso}</td>
                  <td>{curso.docente}</td>
                  <td>{curso.categoria}</td>
                  <td>{curso.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
