import pool from '../config/database';

// Ambil semua role (admin, editor, dll)
export const getAllRoles = async () => {
  const [rows] = await pool.query('SELECT * FROM roles');
  return rows;
};

// Tambah role baru
export const createRole = async (name: string) => {
  const [result] = await pool.execute('INSERT INTO roles (name) VALUES (?)', [name]);
  return result;
};

// Hapus role
export const deleteRole = async (id: number) => {
  const [result] = await pool.execute('DELETE FROM roles WHERE id = ?', [id]);
  return result;
};