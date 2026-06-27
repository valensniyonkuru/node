const pool = require('./pool');

const getAllItems = () =>
  pool.query('SELECT * FROM items ORDER BY created_at DESC');

const getItemById = (id) =>
  pool.query('SELECT * FROM items WHERE id = $1', [id]);

const createItem = (name, description) =>
  pool.query(
    'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );

const updateItem = (id, name, description) =>
  pool.query(
    `UPDATE items
     SET name = $2, description = $3, updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id, name, description]
  );

const deleteItem = (id) =>
  pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };
