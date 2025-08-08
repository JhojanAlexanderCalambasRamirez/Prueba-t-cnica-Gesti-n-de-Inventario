const pool = require('../models/db');

exports.registrarVenta = async (producto_id, cantidad) => {
  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    throw new Error('Cantidad inválida');
  }

  const { rows: productoRows } = await pool.query(
    'SELECT * FROM productos WHERE id = $1',
    [producto_id]
  );

  if (productoRows.length === 0) {
    throw new Error('Producto no encontrado');
  }

  const producto = productoRows[0];

  if (producto.stock < cantidad) {
    throw new Error('Stock insuficiente');
  }

  const monto_total = parseFloat((producto.precio * cantidad).toFixed(2));

  await pool.query('BEGIN');

  try {
    await pool.query(
      'UPDATE productos SET stock = stock - $1 WHERE id = $2',
      [cantidad, producto_id]
    );

    const result = await pool.query(
      `INSERT INTO ventas (producto_id, cantidad, monto_total)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [producto_id, cantidad, monto_total]
    );

    await pool.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  }
};
