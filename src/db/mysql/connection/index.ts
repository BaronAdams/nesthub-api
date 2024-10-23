import "reflect-metadata"
import { sequelize } from "../config";

export const connect = async () => {
    try {
      await sequelize.authenticate();
      console.log("DATABASE CONNECTION SUCCESSFUL");
  
      await sequelize.sync({ alter: true });
      console.log("sync successful");
    } catch (error) {
      console.log(error);
    }
  }
