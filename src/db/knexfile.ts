import type { Knex } from "knex";
import path from "path";

// Update with your config settings.
interface IKnexConfig { 
  [key: string]: Knex.Config, 
}

const dbConfig: IKnexConfig  = {
  development: {
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'Password@123',
      database : 'sql_learn'
    },
    useNullAsDefault: true,
    migrations:{
      directory: path.join(__dirname, './db/migrations')
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default dbConfig;
