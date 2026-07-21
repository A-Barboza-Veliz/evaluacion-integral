import { useState, useEffect } from 'react';
import API from '../services/api';

export default function Dashboard() {
  const [myEnrollments, setMyEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await API.get('/enrollments/my-courses');
      setMyEnrollments(res.data);
    } catch (err) {
      console.error("Error al obtener inscripciones", err);
    }
  };

  return (
    <div className="container my-4">
      <h2>🎓 Mis Cursos Inscritos</h2>

      {myEnrollments.length === 0 ? (
        <p className="text-muted mt-3">Aún no te has inscrito en ningún curso.</p>
      ) : (
        <div className="row g-3 mt-2">
          {myEnrollments.map((item) => (
            <div className="col-md-6" key={item._id}>
              <div className="card border-start border-4 border-success shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.course.title}</h5>
                  <p className="card-text text-muted">{item.course.description}</p>
                  <small className="text-success fw-bold">
                    Inscrito el: {new Date(item.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}