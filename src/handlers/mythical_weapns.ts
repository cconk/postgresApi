import express, { Request, Response} from 'express'
import { Weapon, MythicalWeaponStore } from "../models/mythical_weapons";



const store = new MythicalWeaponStore()

const index = async (_req: Request, res: Response) => {
  const weapons = await store.index();
  res.json(weapons);
}

const show = async (req: Request, res: Response) => {
  const weapon = await store.show(req.params.id);
  res.json(weapon);
}

const create = async (req: Request, res: Response) => {
  try {
    const weapon: Weapon = {
      name: req.body.name,
      type: req.body.type,
      weight: req.body.weight
    }

    const newWeapon = await store.create(weapon)
    res.json(newWeapon)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}

const mythical_weapons_routes = (app: express.Application) => {
  app.get('/mythical_weapons', index)
  app.get('/mythical_weapons/:id', show)
  app.post('/mythical_weapons', create)
  app.delete('/mythical_weapons/:id', destroy)
}

export default mythical_weapons_routes;