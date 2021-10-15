const { Router } = require("express");
const router = Router();
const admin = require('firebase-admin')

const db = admin.firestore()

//#region Funciones
const traerUsuario = async (nombreUsuario) => {
  let usuario
  await db
    .collection('usuarios')
    .where('usuario', '==', nombreUsuario)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => (usuario = doc.data())),
    )
  return usuario
}
//#endregion

// POST: usuario(nombre: string, apellido: string, usuario: string, contraseña: string, dni: number) => void
router.post('/api/usuario', (req, res) => {
  (async () => {
    try {
      const usuarioReq = req.body.usuario
      const usuario = await traerUsuario(usuarioReq)
      if (!usuario) {
        await db.collection('usuarios').doc().set({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          usuario: usuarioReq,
          dni: req.body.dni,
        })
        return res.status(200).send()
      } else return res.status(400).send('El usuario ya existe')
    } catch (error) {
      return res.status(500).send(error)
    }
  })()
})

// GET: usuario(usuario: string, contraseña: string) => Usuario
router.get('/api/usuario/:usuario', (req, res) => {
  (async () => {
    try {
      const usuario = await traerUsuario(req.params.usuario)
      if (usuario) return res.status(200).send(usuario)
      else return res.status(400).send('El usuario no existe')
    } catch (error) {
      return res.status(500).send(error)
    }
  })()
})

// PUT: usuario(nombre: string, apellido: string, usuario: string, contraseña: string, dni: number, domicilios[{calle: string, altura: number, codigoPostal: stringl}], telefono: number, tarjetas[{tipo: string, numero: number}], cuentas[{numeroDeCuenta: number}], saldo: number) => void
router.put('/api/usuario', (req, res) => {
  (async () => {
    try {
      const usuarioReq = req.body.usuario

      let usuarioId
      await db
        .collection('usuarios')
        .where('usuario', '==', usuarioReq)
        .get()
        .then((querySnapshot) =>
          querySnapshot.forEach((doc) => (usuarioId = doc.id)),
        )

      if (usuarioId) {
        await db.collection('usuarios').doc(usuarioId).update({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          usuario: usuarioReq,
          dni: req.body.dni,
          domicilios: req.body.domicilios,
          telefono: req.body.telefono,
          tarjetas: req.body.tarjetas,
          cuentas: req.body.cuentas,
          saldo: req.body.saldo,
        })
        return res.status(200).send()
      } else return res.status(400).send('El usuario no existe')
    } catch (error) {
      return res.status(500).send(error)
    }
  })()
})

module.exports = router;