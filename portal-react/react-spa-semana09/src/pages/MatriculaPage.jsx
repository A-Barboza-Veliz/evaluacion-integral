import { useState } from 'react';
import './MatriculaPage.css';

const MatriculaPage = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleEntendido = () => {
    const baseUrl = import.meta.env.VITE_ANGULAR_URL || 'https://evaluacion-integral-app.vercel.app';
    const cleanUrl = baseUrl.trim().replace(/\/$/, '');
    const angularUrl = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') ? cleanUrl : `https://${cleanUrl}`;
    const searchParams = window.location.search || '';
    window.location.href = `${angularUrl}/inicio${searchParams}`;
  };

  const handleRecordar = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="matricula-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>🎓 ¡Bienvenido al Portal del Alumno!</h1>
          <p className="subtitle">Tu futuro comienza aquí</p>
        </div>
      </div>

      <main className="main-content">
        <div className="alert-banner">
          <div className="alert-icon">⚠️</div>
          <div className="alert-text">
            <h2>¡No te olvides de matricularte!</h2>
            <p>El plazo de matrícula finaliza el <strong>31 de marzo de 2026</strong></p>
          </div>
          <button className="alert-btn" onClick={handleRecordar}>
            Recordar más tarde
          </button>
        </div>

        <div className="info-cards-container">
          <div className="info-card">
            <div className="card-icon">📅</div>
            <h3>Fechas clave</h3>
            <ul>
              <li><span className="label">Inicio de clases:</span> 7 de abril de 2026</li>
              <li><span className="label">Último día de matrícula:</span> 31 de marzo de 2026</li>
              <li><span className="label">Pago de matrícula:</span> Hasta el 5 de abril de 2026</li>
              <li><span className="label">Periodo de adaptación:</span> 7-11 de abril de 2026</li>
            </ul>
          </div>

          <div className="info-card">
            <div className="card-icon">📋</div>
            <h3>Documentos necesarios</h3>
            <ul>
              <li>✓ DNI o carnet de identidad (original y copia)</li>
              <li>✓ Fotografía tamaño carnet (fondo blanco)</li>
              <li>✓ Partida de nacimiento</li>
              <li>✓ Certificado de estudios anteriores</li>
              <li>✓ Constancia de salud (opcional)</li>
            </ul>
          </div>

          <div className="info-card">
            <div className="card-icon">💳</div>
            <h3>Modalidades de pago</h3>
            <ul>
              <li>💻 Pago en línea con tarjeta</li>
              <li>🏦 Depósito bancario (BCP/Interbank)</li>
              <li>🏢 Pago en caja del instituto</li>
              <li>🎓 Becas y ayudas disponibles</li>
              <li>📱 Yape/Plin (nuevo)</li>
            </ul>
          </div>

          <div className="info-card">
            <div className="card-icon">📞</div>
            <h3>Contacto y soporte</h3>
            <ul>
              <li>📞 Teléfono: (01) 555-1234</li>
              <li>📧 Email: matricula@instituto.edu</li>
              <li>🕐 Horario: Lun-Vie 8am-5pm</li>
              <li>📍 Oficina de admisiones - Piso 2</li>
              <li>💬 WhatsApp: +51 999 888 777</li>
            </ul>
          </div>
        </div>

        <div className="action-section">
          <h3>¿Entendido la información?</h3>
          <div className="action-buttons">
            <button className="primary-btn" onClick={handleEntendido}>
              👍 Entendido, ir al portal de alumno
            </button>
          </div>
        </div>

        <div className="additional-info">
          <div className="info-badge">
            <span className="badge-icon">ℹ️</span>
            <p>Revisa que todos tus datos estén actualizados antes de iniciar el proceso de matrícula.</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Instituto de Educación Superior</h4>
            <p>Comprometidos con tu formación profesional</p>
          </div>
          <div className="footer-section">
            <p>© 2026 - Todos los derechos reservados</p>
            <p className="footer-version">Portal v2.3.1</p>
          </div>
        </div>
      </footer>

      {showAlert && (
        <div className="toast-notification">
          <span className="toast-icon">✅</span>
          <span>Recordatorio guardado. Te avisaremos pronto.</span>
        </div>
      )}
    </div>
  );
};

export default MatriculaPage;