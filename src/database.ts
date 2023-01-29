import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV
} = process.env;

// const client: Pool = new Pool({
//   host: POSTGRES_HOST,
//   database: ENV === 'dev' ? POSTGRES_DEV_DB : POSTGRES_TEST_DB,
//   user: ENV === 'dev' ? POSTGRES_USER : POSTGRES_TEST_USER,
//   password: ENV === 'dev' ? POSTGRES_PASSWORD : POSTGRES_TEST_PASSWORD,
// })
//console.log(process.env)
let client
if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  })
}

if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  })
}

export default client;