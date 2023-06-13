import { config } from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm"

config({ path: `.env.${process.env.NODE_ENV}` })

const developmentConfig: DataSourceOptions = {
  type: "sqlite",
  database: process.env.DB_NAME,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/db/migrations/*.js"],
  synchronize: process.env.DB_SYNC === "true" || false,
}

const testConfig: DataSourceOptions = {
  type: "sqlite",
  database: process.env.DB_NAME,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/db/migrations/*.js"],
  synchronize: process.env.DB_SYNC === "true" || false,
}

const productionConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: true,
  },
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/db/migrations/*.js"],
  synchronize: false,
}

export const dataSourceOptions =
  process.env.NODE_ENV === "production"
    ? productionConfig
    : process.env.NODE_ENV === "test"
    ? testConfig
    : developmentConfig

// export const dataSourceOptions = productionConfig

console.log("dataSourceOptions", dataSourceOptions)

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
