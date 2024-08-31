import { Sequelize } from 'sequelize'

export default new Sequelize(
    'mps-db',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)