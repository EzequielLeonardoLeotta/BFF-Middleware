const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({ origin: true }))

const serviceAccount = require('./permissions.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fir-api-9a206..firebaseio.com',
})
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
app.post('/api/usuario', (req, res) => {
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
app.get('/api/usuario/:usuario', (req, res) => {
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
app.put('/api/usuario', (req, res) => {
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

exports.app = functions.https.onRequest(app)
