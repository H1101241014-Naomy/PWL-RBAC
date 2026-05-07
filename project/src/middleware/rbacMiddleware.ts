import { Request, Response, NextFunction } from 'express';
import pool from '../config/database';

export const checkPermission = (requiredPermission: string) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      // 1. Ambil data user yang sedang aktif (Naomy) dari database
      // Kita ambil berdasarkan ID 1 karena kamu belum buat sistem login
      const [userRows]: any = await pool.query('SELECT id, role_id FROM users WHERE id = 1');
      
      if (userRows.length === 0) {
        return res.status(404).send('User tidak ditemukan di database.');
      }

      const user = userRows[0];
      const roleId = user.role_id;

      // 2. Query untuk cek apakah Role tersebut punya Permission yang diminta
      // Kita join tabel roles -> role_permissions -> permissions
      const [permissionRows]: any = await pool.query(`
        SELECT p.name FROM roles r
        JOIN role_permissions rp ON r.id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE r.id = ? AND p.name = ?
      `, [roleId, requiredPermission]);

      // 3. Logika Pengecekan
      if (permissionRows.length > 0) {
        // Jika ditemukan di database, berarti boleh lewat (Lanjut hapus/edit/view)
        console.log(`Akses DIBERIKAN untuk role_id: ${roleId} melakukan: ${requiredPermission}`);
        next();
      } else {
        // Jika TIDAK ADA di database, maka muncul 403 (Ini yang dicari dosen)
        console.log(`Akses DITOLAK untuk role_id: ${roleId} melakukan: ${requiredPermission}`);
        res.status(403).send(`
          <div style="text-align:center; margin-top:50px; font-family:sans-serif;">
            <h1 style="color:red; font-size:50px;">403</h1>
            <h2>Forbidden: Insufficient Permissions</h2>
            <p>Maaf, Role Anda tidak memiliki izin untuk melakukan aksi: <b>${requiredPermission}</b></p>
            <a href="/users">Kembali ke Daftar User</a>
          </div>
        `);
      }
    } catch (error) {
      console.error('RBAC Error:', error);
      res.status(500).send('Database Error');
    }
  };
};