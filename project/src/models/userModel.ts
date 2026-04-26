import pool from '../config/database';

// Fungsi untuk mengambil semua data user
export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
};

// Fungsi untuk menambah user baru
export const createUser = async (userData: any) => {
  const { username, password, role_id } = userData;
  const [result] = await pool.execute(
    'INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)',
    [username, password, role_id]
  );
  return result;
};

// Fungsi untuk menghapus user (INI YANG BIKIN ERROR TADI!)
export const deleteUser = async (id: number) => {
  const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return result;
};