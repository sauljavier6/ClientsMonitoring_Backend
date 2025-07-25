import { Request, Response } from 'express';
import Flyer from '../models/Flyer';


export async function updateFlyer(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ error: 'Archivo no recibido' });
  }

  try {
    const flyer = await Flyer.findByPk(1);
    if (!flyer) {
      return res.status(404).json({ error: 'Flyer no encontrado' });
    }

    flyer.Url = `/${req.file.filename}`;
    await flyer.save();

    return res.status(200).json(flyer);
  } catch (error) {
    console.error('Error al actualizar flyer:', error);
    return res.status(500).json({ error: 'Error al actualizar flyer' });
  }
}


export async function createFlyer(req: Request, res: Response) {
  const { Url } = req.body;

  if (!Url) {
    return res.status(400).json({ error: 'El campo Url es obligatorio' });
  }

  try {
    const newFlyer = await Flyer.create({ Url });
    return res.status(201).json(newFlyer);
  } catch (error) {
    console.error('Error al crear flyer:', error);
    return res.status(500).json({ error: 'Error al crear flyer' });
  }
}

export async function getAllFlyers(req: Request, res: Response) {
  try {
    const flyers = await Flyer.findByPk(1);
    return res.status(200).json(flyers);
  } catch (error) {
    console.error('Error al obtener flyers:', error);
    return res.status(500).json({ error: 'Error al obtener flyers' });
  }
}
