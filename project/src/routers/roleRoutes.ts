import { Router } from 'express';
import { listRoles, storeRole } from '../controllers/roleController';
import { checkPermission } from '../middleware/rbacMiddleware';

const router = Router();

// Cek izin 'role:view' sebelum melihat daftar role
router.get('/', checkPermission('role:view'), listRoles);
// Cek izin 'role:create' sebelum menambah role baru
router.post('/', checkPermission('role:create'), storeRole);

export default router;