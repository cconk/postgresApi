import bcrypt from 'bcrypt'
import client from '../database';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS?.toString() || '';

export type User = {
  id?: number;
  username: string;
  password: string;
}

export class UserStore {

  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    }
    catch (err) {
      throw new Error(`This didn't work cannont get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows.length ? result.rows[0] : null;
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }
  
  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'

      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [u.username, hash])
      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    // @ts-ignore
    const conn = await client.connect()
    const sql = 'SELECT password_digest FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])

    console.log(password + pepper)

    if (result.rows.length) {
      //console.log(result)
      const user = result.rows[0]

      console.log(user)

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user
      }
    }
    return null
  }

  async update(id: string, data: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET (username,password_digest) = ($2, $3) WHERE id=($1) RETURNING *';
      console.log(sql);
      // @ts-ignore
      const conn = await client.connect();

      const hash = bcrypt.hashSync(
            data.password + pepper,
            parseInt(saltRounds)
          );
      console.log(id, data.username, data.password, hash);
      const result = await conn.query(sql, [id,data.username,hash]);
      console.log(result);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${data.username}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
  }

}