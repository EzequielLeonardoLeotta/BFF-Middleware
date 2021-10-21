import express from 'express';
import {findOneUsuario, saveUsuario, updateUsuario} from '../controllers/usuario';
import healthController from '../controllers/health';

const router = express.Router();
router.get('/api/v1/usuario/:usuario', findOneUsuario);
router.post('/api/v1/usuario', saveUsuario);
router.put('/api/v1/usuario', updateUsuario);

router.get('/health', healthController.healthCheck);

export default router;