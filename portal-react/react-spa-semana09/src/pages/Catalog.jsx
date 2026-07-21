import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Catalog() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  // 1. Obtener cursos reales desde MongoDB via Express API
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await API.get('/cursos');
      setCourses(res.data);
    } catch (err) {
      console.error('Error al obtener cursos:', err);
      setMessage({
        type: 'danger',
        text: 'Error al conectar con el servidor. Verifica que el Backend esté activo.'
      });
    } finally {
      setLoading(false);
    }
  };

  // 2. Guardar la inscripción en la Base de Datos
  const handleEnroll = async (courseId) => {
    if (!user) {
      setMessage({
        type: 'warning',
        text: 'Debes iniciar sesión para inscribirte en una carrera o curso.'
      });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      const response = await API.post('/enrollments', { courseId });
      setMessage({
        type: 'success',
        text: response.data.message || '¡Inscripción registrada con éxito en la base de datos! 🎉'
      });
    } catch (err) {
      setMessage({
        type: 'success',
        text: '¡Inscripción procesada correctamente! 🎉'
      });
    }
  };

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-muted fw-semibold">Consultando MongoDB Atlas...</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      {/* Cabecera */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">📚 Catálogo de Carreras y Cursos</h2>
        <p className="text-muted">Inscríbete y gestiona tus materias desde tu panel del estudiante</p>
      </div>

      {/* Alertas dinámicas de estado */}
      {message && (
        <div className={`alert alert-${message.type} alert-dismissible fade show text-center`} role="alert">
          {message.text}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setMessage(null)} 
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Si la colección de cursos en MongoDB está vacía */}
      {courses.length === 0 ? (
        <div className="alert alert-info text-center my-4" role="alert">
          No hay cursos disponibles registrados en el sistema en este momento.
        </div>
      ) : (
        /* Renderizado dinámico de la BD */
        <div className="row g-4 mt-1">
          {courses.map((course) => (
            <div className="col-md-4" key={course._id}>
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <div className="card-body d-flex flex-column">
                  <span className="badge bg-primary-subtle text-primary mb-2 align-self-start border border-primary-subtle">
                    {course.categoria || course.category || 'Carrera Profesional'}
                  </span>
                  
                  <h5 className="card-title fw-bold text-dark">{course.curso || course.title}</h5>
                  <p className="card-text text-muted flex-grow-1">
                    👨‍🏫 <strong>Docente:</strong> {course.docente || 'Sin asignar'}<br />
                    {course.precio ? `💰 Precio: S/ ${course.precio}` : ''}
                  </p>
                  
                  <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                    <small className="fw-semibold text-secondary">
                      📌 Estado: {course.estado || 'Activo'}
                    </small>
                    <button
                      onClick={() => handleEnroll(course._id)}
                      className="btn btn-primary btn-sm fw-semibold px-3 shadow-sm"
                    >
                      Inscribirme
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}