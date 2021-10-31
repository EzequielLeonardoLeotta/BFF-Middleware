import express from 'express'
import { findProductos, updateProducto, savePedido,  findPedidosByComprador, saveDenuncia, saveReclamo} from '../controllers/compras'

const router = express.Router()

router.get('/api/v1/producto', findProductos)
router.put('/api/v1/producto', updateProducto)

router.post('/api/v1/pedido', savePedido)
router.get('/api/v1/pedido/:comprador', findPedidosByComprador)

router.post('/api/v1/denuncia', saveDenuncia)

router.post('/api/v1/reclamo', saveReclamo)

export default router