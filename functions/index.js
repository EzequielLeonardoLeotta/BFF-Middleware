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

//POST: usuario(nombre: string, apellido: string, usuario: string, contraseña: string, dni: number) => void
app.post('/api/usuario', (req, res) => {
    (async () => {
      try {
        await db.collection('usuarios').doc().set({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          usuario: req.body.usuario,
          dni: req.body.dni
        })
        return res.status(200).send()
      } catch (error) {
        return res.status(500).send(error)
      }
    })()
  })

exports.app = functions.https.onRequest(app)