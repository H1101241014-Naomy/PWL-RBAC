import { Request, Response, NextFunction } from 'express';
import pool from '../config/database';

interface AuthRequest extends Request {
  user?: { id: number; role_id: number };
}

export const checkPermission = (requiredPermission: string) => {
  return async (req: any, res: Response, next: NextFunction) => {
    // 1. Jika req.user kosong, kita paksa pakai user id 1 (naomy)
    if (!req.user) {
      req.user = { id: 1, role_id: 1 };
    }

    const userId = req.user?.id;

    // 2. JALUR KHUSUS: Jika ID user adalah 1, langsung loloskan tanpa cek database
    // Ini biar kamu bisa buka Roles & Permissions tanpa ribet
    if (userId === 1) {
      return next();
    }

    // 3. Jika bukan ID 1, baru cek database
    try {
      const [rows] = await pool.query(`
        SELECT p.name FROM users u
        JOIN roles r ON u.role_id = r.id
        JOIN role_permissions rp ON r.id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE u.id = ?
      `, [userId]);

      const permissions = (rows as any[]).map(row => row.name);
      
      if (permissions.includes(requiredPermission)) {
        next();
      } else {
        res.status(403).send('Forbidden: insufficient permissions');
      }
    } catch (error) {
      res.status(500).send('Database Error');
    }
  };
};