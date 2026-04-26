import { Request, Response } from 'express';
import { getAllRoles, createRole } from '../models/roleModel';

export const listRoles = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  res.render('layouts/main', {
    title: 'Role Management',
    body: '../roles/list', // Pastikan file ejs ini ada di folder views/roles/
    roles
  });
};

export const storeRole = async (req: Request, res: Response) => {
  await createRole(req.body.name);
  res.redirect('/roles');
};