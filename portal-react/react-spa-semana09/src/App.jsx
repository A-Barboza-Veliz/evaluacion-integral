import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MatriculaPage from './pages/MatriculaPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MatriculaPage />} />
        <Route path="*" element={<MatriculaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;