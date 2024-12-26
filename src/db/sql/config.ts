import { Sequelize } from 'sequelize'

let isDev = process.env.NODE_ENV || "development"

const HOSTNAME = isDev ? "localhost" : process.env.POSTGRES_HOSTNAME
const USERNAME = isDev ? "postgres" : process.env.POSTGRES_USERNAME
const PASSWORD = isDev ? "root" : process.env.POSTGRES_PASSWORD
const PORTNUMBER = isDev ? 5432 : process.env.POSTGRES_PORTNUMBER
const DATABASENAME = isDev ? "real-estate-db" : process.env.POSTGRES_DATABASENAME

const sequelize = new Sequelize(`postgres://${USERNAME}:${PASSWORD}@${HOSTNAME}:${PORTNUMBER}/${DATABASENAME}`) // Example for postgres

export default sequelize