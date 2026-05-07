import { Request, Response } from 'express';
import pool from '../config/database'; // Ambil langsung dari pool kalau model belum ada

export const listPermissions = async (req: Request, res: Response) => {
  // Pakai [rows] untuk mendestruktur hasil query
  const [rows] = await pool.query('SELECT * FROM permissions'); 
  
  res.render('layouts/main', {
    title: 'Permission Management',
    body: '../permissions/list',
    permissions: rows // Pastikan yang dikirim adalah 'rows'
  });
};