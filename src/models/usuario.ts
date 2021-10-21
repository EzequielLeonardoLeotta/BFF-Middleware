import { Schema, Document, model } from 'mongoose'

export interface IUsuario extends Document {
  nombre: String,
  apellido: String,
  usuario: String,
  dni: Number,
  domicilios: [String],
  telefono: Number,
  tarjetas: [String],
  cuentas: [String],
  saldo: Number
};

export const UsuarioSchema = new Schema({
  nombre: String,
  apellido: String,
  usuario: String,
  dni: Number,
  domicilios: [String],
  telefono: Number,
  tarjetas: [String],
  cuentas: [String],
  saldo: Number
})


const Usuario = model<IUsuario>('Usuario', UsuarioSchema);
export default Usuario;
