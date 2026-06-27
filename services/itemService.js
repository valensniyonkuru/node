const queries = require('../db/queries');

const getAllItems = async () => {
  const result = await queries.getAllItems();
  return result.rows;
};

const getItemById = async (id) => {
  const result = await queries.getItemById(id);
  if (result.rowCount === 0) {
    const err = new Error(`Item with id '${id}' not found`);
    err.status = 404;
    throw err;
  }
  return result.rows[0];
};

const createItem = async (name, description) => {
  if (!name || !name.trim()) {
    const err = new Error('name is required and cannot be empty');
    err.status = 400;
    throw err;
  }
  const result = await queries.createItem(name.trim(), description);
  return result.rows[0];
};

const updateItem = async (id, name, description) => {
  if (!name || !name.trim()) {
    const err = new Error('name is required and cannot be empty');
    err.status = 400;
    throw err;
  }
  // Confirm the item exists before updating
  await getItemById(id);
  const result = await queries.updateItem(id, name.trim(), description);
  return result.rows[0];
};

const deleteItem = async (id) => {
  const result = await queries.deleteItem(id);
  if (result.rowCount === 0) {
    const err = new Error(`Item with id '${id}' not found`);
    err.status = 404;
    throw err;
  }
  return result.rows[0];
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };
