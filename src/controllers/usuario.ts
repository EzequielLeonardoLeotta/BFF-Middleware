import { Request, Response } from 'express';
import {findOneUsuarioService, saveUsuarioService, updateUsuarioService} from '../services/usuario';

export const findOneUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        await findOneUsuarioService(req, res);
    } catch (e) {
        throw e;
    }
};

export const saveUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        await saveUsuarioService(req, res);
    } catch (e) {
        throw e;
    }
};

export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        await updateUsuarioService(req, res);
    } catch (e) {
        throw e;
    }
};