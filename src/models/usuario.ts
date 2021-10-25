import { Schema, Document, model } from 'mongoose'

export interface IUsuario extends Document {
  nombre: String,
  apellido: String,
  usuario: String,
  dni: Number,
  domicilios: [String],
  telefono: Number,
  tarjetas: [String],
  cuentas: [Number],
  saldo: Number
};

export const UsuarioSchema = new Schema({
  nombre: String,
  apellido: String,
  usuario: { type: String, unique: true},
  dni: Number,
  domicilios: [String],
  telefono: Number,
  tarjetas: [String],
  cuentas: [Number],
  saldo: Number
})


const Usuario = model<IUsuario>('Usuario', UsuarioSchema);
export default Usuario;
