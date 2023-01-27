import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mythical_weapons_routes from './handlers/mythical_weapns'
import books_routes from './handlers/books'
import users_routes from './handlers/users'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

mythical_weapons_routes(app);
books_routes(app);
users_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;