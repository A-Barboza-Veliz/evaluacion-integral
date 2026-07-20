//aca ponemos los metodos que tendra el sistema llamando a los metodos de moongose como create, find, findByIdAndUpdate, findByIdAndDelete

const Curso = require('../models/Curso');

exports.crear = async (req, res) => {
  try {
    const { curso, docente, categoria, inscritos, precio, estado } = req.body;

    if (!curso || !docente || !categoria) {
      return res.status(400).json({ error: 'Curso, docente y categoría son obligatorios' });
    }

    const nuevo = await Curso.create({
      curso,
      docente,
      categoria,
      inscritos: inscritos || '0',
      precio: precio || '0',
      estado: estado || 'Activo'
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (error) {
    const cursosDemo = [
      { _id: 'demo1', curso: 'Desarrollo Web', docente: 'Prof. Díaz', categoria: 'Programación', estado: 'Disponible' },
      { _id: 'demo2', curso: 'Base de Datos', docente: 'Prof. López', categoria: 'Datos', estado: 'Disponible' },
      { _id: 'demo3', curso: 'Diseño UI/UX', docente: 'Prof. Ramírez', categoria: 'Diseño', estado: 'Disponible' }
    ];

    res.json(cursosDemo);
  }
};

exports.actualizar = async (req, res) => {
  try {
    const actualizado = await Curso.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Curso.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Curso eliminado' });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

exports.obtener = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json(curso);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

// 📊 NUEVO: OBTENER ESTADÍSTICAS PARA EL DASHBOARD
exports.obtenerEstadisticas = async (req, res) => {
  try {
    // 1️⃣ Total de cursos
    const totalCursos = await Curso.countDocuments();
    
    // 2️⃣ Total de inscritos (suma de todos los inscritos)
    const totalInscritosResult = await Curso.aggregate([
      { $group: { _id: null, total: { $sum: { $toInt: '$inscritos' } } } }
    ]);
    const totalInscritos = totalInscritosResult.length > 0 ? totalInscritosResult[0].total : 0;
    
    // 3️⃣ Cursos por categoría
    const cursosPorCategoria = await Curso.aggregate([
      { $group: { _id: '$categoria', cantidad: { $sum: 1 } } },
      { $sort: { cantidad: -1 } }
    ]);
    
    // 4️⃣ Cursos más pedidos (por inscritos)
    const cursosMasPedidos = await Curso.find()
      .sort({ inscritos: -1 })
      .limit(5)
      .lean();
    
    // 5️⃣ Cursos por estado
    const cursosPorEstado = await Curso.aggregate([
      { $group: { _id: '$estado', cantidad: { $sum: 1 } } }
    ]);
    
    // 6️⃣ Precio promedio
    const precioPromedioResult = await Curso.aggregate([
      { $group: { _id: null, promedio: { $avg: { $toDouble: '$precio' } } } }
    ]);
    const promedioPrecio = precioPromedioResult.length > 0 
      ? Math.round(precioPromedioResult[0].promedio * 100) / 100 
      : 0;

    // 📤 Enviar respuesta
    res.json({
      totalCursos,
      totalInscritos,
      cursosPorCategoria: cursosPorCategoria.map(item => ({
        categoria: item._id,
        cantidad: item.cantidad
      })),
      cursosMasPedidos,
      cursosPorEstado: cursosPorEstado.map(item => ({
        estado: item._id,
        cantidad: item.cantidad
      })),
      promedioPrecio
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      error: error.message
    });
  }
}; 