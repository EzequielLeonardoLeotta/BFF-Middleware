import { Request, Response } from 'express'
import Usuario from '../models/usuario'

const findOneUsuario = async (usuario: string) =>
  await Usuario.findOne({ usuario: usuario }).exec()

// GET: usuario(usuario: string, contraseña: string) => Usuario
export const findOneUsuarioService = async (req: Request, res: Response) => {
  const usuarioWanted = await findOneUsuario(req.params.usuario)

  if (usuarioWanted) return res.status(200).send(usuarioWanted)
  else return res.status(400).send('Error: El usuario no existe')
}

// POST: usuario(nombre: string, apellido: string, usuario: string, contraseña: string, dni: number) => void
export const saveUsuarioService = async (req: Request, res: Response) => {
  try {
    const usuarioWanted = await findOneUsuario(req.body.usuario)

    if (!usuarioWanted) {
      const usuario = new Usuario(req.body)
      await usuario.save()
      res.status(200).send('Error: Usuario guardado correctamente')
    } else return res.status(400).send('El usuario ya existe')
  } catch (error) {
    res.status(500).send('Error: No se pudo guardar el usuario')
  }
}

// PUT: usuario(nombre: string, apellido: string, usuario: string, contraseña: string, dni: number, domicilios[{calle: string, altura: number, codigoPostal: stringl}], telefono: number, tarjetas[{tipo: string, numero: number}], cuentas[{numeroDeCuenta: number}], saldo: number) => void
export const updateUsuarioService = async (req: Request, res: Response) => {
  try {
    const usuarioWanted = await findOneUsuario(req.body.usuario)

    if (usuarioWanted) {
      const usuario = new Usuario(req.body)

      const filter = { usuario: usuario.usuario }
      const update = {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        domicilios: usuario.domicilios,
        tarjetas: usuario.tarjetas,
        cuentas: usuario.cuentas,
        saldo: usuario.saldo,
      }

      await Usuario.findOneAndUpdate(filter, update)
      res.send('Usuario actualizado correctamente')
    } else res.status(404).send('Error: El usuario no existe')
  } catch (error) {
    res.status(500).send('Error: No se pudo actualizar el usuario')
  }
}
