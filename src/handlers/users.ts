import express, { Request, Response } from 'express';
import { User, UserStore } from "../models/users";
import jwt, { Secret } from 'jsonwebtoken';


const store = new UserStore();
const tokenSecret = process.env.TOKEN_SECRET || '';

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
}


const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      password: req.body.password
    }
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, tokenSecret as Secret);
    res.json({ id: newUser.id, token })
  } catch(err) {
    res.status(400);
    res.json(err);
  }
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  }
  try {
    const u = await store.authenticate(user.username, user.password)
    if (u) {
      var token = jwt.sign({ user: u }, tokenSecret as Secret);
      res.json(token)
    } else {
      throw new Error('User id not found!')
    }
    
  } catch (error) {
    res.status(401)
    res.json({ error })
  }
}

const update = async (req: Request, res: Response) => {
  const user: User = {
    id: parseInt(req.params.id),
    username: req.body.username,
    password: req.body.password,
  }
  try {
    const authorizationHeader = req.headers.authorization || '';
    const token = authorizationHeader
    jwt.verify(token, tokenSecret)
  } catch (err) {
    res.status(401)
    res.json(err)
    return
  }

  try {
    const updated = await store.update(req.params.id, user)
    res.json(updated)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id)
    res.json(deleted);
  } catch (err) {
    res.status(400)
    res.json({ err })
  }
}

const users_routes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.post('/users/authenticate', authenticate)
  app.patch('/users/:id', update)
  app.delete('/users/:id', destroy)
}

export default users_routes;