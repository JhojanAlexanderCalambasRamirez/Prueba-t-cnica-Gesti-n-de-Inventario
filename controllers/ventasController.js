const ventasService = require('../services/ventasService');

exports.registrarVenta = async (req, res) => {
  try {
    const { producto_id, cantidad } = req.body;
    const venta = await ventasService.registrarVenta(producto_id, cantidad);
    res.status(201).json(venta);
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Stock insuficiente') {
      return res.status(422).json({ error: error.message });
    }
    if (error.message === 'Cantidad inválida') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
