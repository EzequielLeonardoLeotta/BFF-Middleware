import express from 'express'
import {
  findOneUsuario,
  saveUsuario,
  updateUsuario,
} from '../controllers/usuario'
import healthController from '../controllers/health'

const router = express.Router()

//#region Swagger
/**
 * @swagger
 * tags:
 *   name: Usuario
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - usuario
 *         - dni
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la persona
 *         apellido:
 *           type: string
 *           description: Apellido de la persona
 *         usuario:
 *           type: string
 *           description: Nombre de usuario
 *         dni:
 *           type: number
 *           description: DNI de la persona
 *         domicilios:
 *           type: array
 *           description: Domicilios de la persona
 *           items:
 *              type: string
 *         telefono:
 *           type: number
 *           description: Telefono de la persona
 *         tarjetas:
 *           type: array
 *           description: Numero de tarjetas de la persona
 *           items:
 *              type: string
 *         cuentas:
 *           type: array
 *           description: Numero de cuentas de la persona
 *           items:
 *              type: number
 *         saldo:
 *           type: number
 *           description: Saldo de la billetera virtual
 *       example:
 *        nombre: Marcos
 *        apellido: Galperion
 *        usuario: ma_galperion
 *        dni: 12345678
 *        domicilios: [Larroque 1234, Payro 1234]
 *        tarjetas: [4000356478956241, 4000125478963564]
 *        cuentas: [800333547896, 65587422145]
 *        saldo: 2000
 */
//#endregion

/**
 * @swagger
 * /api/v1/usuario/{usuario}:
 *  get:
 *    summary: Trae un usuario filtrando por su nombre de usuario.
 *    tags: [Usuario]
 *    parameters:
 *      - in: path
 *        name: usuario
 *        schema:
 *          type: string
 *        required: true
 *        description: Nombre de usuario
 *    responses:
 *      200:
 *        description: Operacion exitosa
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *      400:
 *        description: El usuario no existe
 */
router.get('/api/v1/usuario/:usuario', findOneUsuario)
router.post('/api/v1/usuario', saveUsuario)
router.put('/api/v1/usuario', updateUsuario)

router.get('/health', healthController.healthCheck)

export default router
