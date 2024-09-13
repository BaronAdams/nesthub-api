import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    'mps-db',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

const connect = async () => {
    try {
      await sequelize.authenticate();
      console.log("DATABASE CONNECTION SUCCESSFUL");
  
      await sequelize.sync({ alter: true });
      console.log("sync successful");
    } catch (error) {
      console.log(error);
    }
  }

connect();

export { sequelize, connect }