import { Router } from 'express';
import { listPermissions } from '../controllers/permissionController';
import { checkPermission } from '../middleware/rbacMiddleware';

const router = Router();

// Cek izin 'permission:view' sebelum melihat daftar izin
router.get('/', checkPermission('permission:view'), listPermissions);

export default router;