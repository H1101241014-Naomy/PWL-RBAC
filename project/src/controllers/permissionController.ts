import { Request, Response } from 'express';
import pool from '../config/database'; // Ambil langsung dari pool kalau model belum ada

export const listPermissions = async (req: Request, res: Response) => {
  const [permissions] = await pool.query('SELECT * FROM permissions');
  res.render('layouts/main', {
    title: 'Permission Management',
    body: '../permissions/list', // Pastikan file ejs ini ada di folder views/permissions/
    permissions
  });
};