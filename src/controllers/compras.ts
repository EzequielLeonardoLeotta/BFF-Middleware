import axios from 'axios'
import { Request, Response } from 'express'

export const findProductos = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    return await axios
      .get(`${process.env.COMPRAS_BASEPATH}/api/v1/producto`)
      .then((result) => res.send(result.data))
  } catch (e) {
    res.status(500).send(e)
  }
}

export const updateProducto = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    return await axios
      .put(`${process.env.COMPRAS_BASEPATH}/api/v1/producto`, req.body)
      .then((result) => res.send(result.data))
  } catch (e) {
    res.status(500).send(e)
  }
}

export const savePedido = async (req: Request, res: Response): Promise<any> => {
  try {
    return await axios
      .post(`${process.env.COMPRAS_BASEPATH}/api/v1/pedido`, req.body)
      .then((result) => res.send(result.data))
  } catch (e) {
    res.status(500).send(e)
  }
}

export const findPedidosByComprador = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    return await axios
      .get(`${process.env.COMPRAS_BASEPATH}/api/v1/pedido/${req.params.comprador}`)
      .then((result) => res.send(result.data))
  } catch (e) {
    res.status(500).send(e)
  }
}

export const saveDenuncia = async (req: Request, res: Response): Promise<any> => {
  try {
    return await axios
      .post(`${process.env.COMPRAS_BASEPATH}/api/v1/denuncia`, req.body)
      .then((result) => res.send(result.data))
  } catch (e) {
    res.status(500).send(e)
  }
}

export const saveReclamo = async (req: Request, res: Response): Promise<any> => {
  try {
    return await axios
      .post(`${process.env.COMPRAS_BASEPATH}/api/v1/reclamo`, req.body)
      .then((result) => res.send(result.data))
  } catch (e) {
    res.status(500).send(e)
  }
}
