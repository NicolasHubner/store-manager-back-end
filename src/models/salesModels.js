const connection = require('../db');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT StoreManager.sales_products.sale_id AS saleId,
    StoreManager.sales.date AS date,
    StoreManager.sales_products.product_id AS productId,
    StoreManager.sales_products.quantity AS quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales
    ON StoreManager.sales.id = StoreManager.sales_products.sale_id`,
  );
  return result;
};

const getSale = async (sale) => {
  const [result] = await connection
    .execute(
      `SELECT
      StoreManager.sales.date AS date,
      StoreManager.sales_products.product_id AS productId,
      StoreManager.sales_products.quantity AS quantity
      FROM StoreManager.sales_products
      INNER JOIN StoreManager.sales
      ON StoreManager.sales.id = StoreManager.sales_products.sale_id
      WHERE id = ?`,
      [sale],
    );
  return result;
};

const getSaleId = async (id) => {
  const result = await connection.execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);
  return result;
};

const addOneSale = async (id, { productId, quantity }) => {
  const result = await connection.execute(`INSERT INTO StoreManager.sales_products
        (sale_id, product_id, quantity)VALUES (?, ?, ?)`, [id, productId, quantity]);
  // console.log(result);
  return result;
};

const addSaleDate = async () => {
  const date = new Date();
  const [row] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (?)', [date]);
  // console.log([row.insertId]);
  return row;
};

const deleteId = async (id) => {
  const [row] = await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return row.affectedRows;
};

const deleteSalesId = async (id) => {
  const [row] = await connection
    .execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
  return row.affectedRows;
};

// const update = async (name, id) => {
//   const [row] = await connection
//     .execute('INSERT INTO StoreManager.sales (name, id) VALUES (?, ?)', [name, id]);
//   const result = {
//     id: row.insertId,
//     name,
//   };
//   return result;
// };
module.exports = {
  getAll,
  getSale,
  getSaleId,
  addSaleDate,
  addOneSale,
  deleteId,
  deleteSalesId,
};