const pool = require('../models/db');
const ventasService = require('../services/ventasService');

beforeAll(async () => {
  await pool.query('DELETE FROM ventas');
  await pool.query('DELETE FROM productos');

  await pool.query(`
    INSERT INTO productos (id, nombre, precio, stock) VALUES
    ('P101', 'Café Sello Rojo 250g', 6000, 20),
    ('P102', 'Leche Alquería 1L', 4500, 10),
    ('P103', 'Pan Bimbo Artesano', 5000, 1)
  `);
});

afterAll(async () => {
  await pool.end();
});

describe('Casos de uso para registrarVenta', () => {
  test('Caso 1: Venta Exitosa', async () => {
    const venta = await ventasService.registrarVenta('P101', 5);

    expect(venta.producto_id).toBe('P101');
    expect(venta.cantidad).toBe(5);

    const { rows } = await pool.query('SELECT stock FROM productos WHERE id = $1', ['P101']);
    expect(rows[0].stock).toBe(15);
  });

  test('Caso 2: Stock insuficiente', async () => {
    await expect(ventasService.registrarVenta('P102', 11)).rejects.toThrow('Stock insuficiente');

    const { rows } = await pool.query('SELECT stock FROM productos WHERE id = $1', ['P102']);
    expect(rows[0].stock).toBe(10);

    const result = await pool.query('SELECT * FROM ventas WHERE producto_id = $1', ['P102']);
    expect(result.rowCount).toBe(0);
  });

  test('Caso 3: Venta con stock exacto', async () => {
    const venta = await ventasService.registrarVenta('P103', 1);

    expect(venta.producto_id).toBe('P103');
    expect(venta.cantidad).toBe(1);

    const { rows } = await pool.query('SELECT stock FROM productos WHERE id = $1', ['P103']);
    expect(rows[0].stock).toBe(0);
  });
});
