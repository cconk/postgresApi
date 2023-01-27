import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  DEV_HOST,
  DEV_DB_USER,
  DEV_DB_PASSWORD,
  DEV_DB_NAME,
  TEST_HOST,
  TEST_DB_USER,
  TEST_DB_PASSWORD,
  TEST_DB_NAME,
  ENV
} = process.env;

const client: Pool = new Pool({
  host: ENV === 'dev' ? DEV_HOST : TEST_HOST,
  database: ENV === 'dev' ? DEV_DB_NAME : TEST_DB_NAME,
  user: ENV === 'dev' ? DEV_DB_USER : TEST_DB_USER,
  password: ENV === 'dev' ? DEV_DB_PASSWORD : TEST_DB_PASSWORD,
})
console.log(client);
//console.log(process.env)
// let client: Pool
// console.log(ENV)

// if (ENV === 'test') {
//   client = new Pool({
//     host: POSTGRES_HOST,
//     database: TEST_DB_NAME,
//     user: TEST_DB_USER,
//     password: TEST_DB_PASSWORD
//   })
// }

// if (ENV === 'dev') {
//   client = new Pool({
//     host: POSTGRES_HOST,
//     database: DEV_DB_NAME,
//     user: DEV_DB_USER,
//     password: DEV_DB_PASSWORD
//   })
// }

export default client;