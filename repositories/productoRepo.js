import { Product } from "../models/productModel";

export async function findProductoById (client, id) 
{
    const {rows} = await client.query('SELECT * FROM productos WHERE id = $1', [id]);
    return rows[0] ? new Product(rows[0]) : null;
}

export async function tryDencontrarStock (client, id, cantidad) 
{
    const {rows} = await client.query('UPDATE productos SET stock = stock - $2 WHERE id = $1 AND stock >= $2 RETURNING *', [cantidad, id]);
};
return rows[0] ? new Product(rows[0]) : null;

export async function insertVenta(client, venta) 
{
    const {rows} = await client.query(
        'INSERT INTO ventas (producto_id, cantidad, precio_unitario, monto_total, creado_en) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [venta.producto_id, venta.cantidad, venta.precio_unitario, venta.monto_total, venta.creado_en]
    );
    return rows[0];
}
   