import express, { Request, Response } from 'express'
import { Book, BookStore } from "../models/books";
import jwt, { Secret } from 'jsonwebtoken';

const store = new BookStore()
const tokenSecret = process.env.TOKEN_SECRET || '';

const index = async (_req: Request, res: Response) => {
  const books = await store.index();
  res.json(books);
}

const show = async (req: Request, res: Response) => {
  console.log(req.params)
  const book = await store.show(req.params.id);
  res.json(book);
}

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization || '';
    const token = authorizationHeader
    console.log(token)
    jwt.verify(token, tokenSecret || '')
  } catch (err) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }
  
  try {
    const book: Book = {
      title: req.body.title,
      author: req.body.author,
      total_pages: req.body.total_pages,
      type: req.body.type,
      summary: req.body.summary
    }

    const newBook = await store.create(book)
    res.json(newBook)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization || ''
    const token = authorizationHeader
    jwt.verify(token, tokenSecret || '')
  } catch (err) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }

  try {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
  } catch (err) {
    res.status(400)
    res.json({ err })
  }
  
}

const books_routes = (app: express.Application) => {
  app.get('/books', index)
  app.get('/books/:id', show)
  app.post('/books', create)
  app.delete('/books/:id', destroy)
}

export default books_routes;