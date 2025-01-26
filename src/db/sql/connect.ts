// import { users } from "../data";
import sequelize from "./config";
import models from "./models";

export const connect = async () => {
    // Initialisation des modèles
    Object.values(models).forEach((model) => {
        model.initialize(sequelize);
    });

    // Déclaration des relations
    Object.values(models).forEach((model) => {
        if ('associate' in model) {
            model.associate(models);
        }
    });
    
    try {
        await sequelize.authenticate();
        console.log("DATABASE CONNECTION SUCCESSFUL");
        await sequelize.sync({ alter: true });
        console.log("SYNC SUCCESFUL");
        // @ts-ignore
        // await models.User.bulkCreate(users)
        // console.log("DEFAULT VALUES SUCCESFUL CREATED");
    } catch (error) {
        console.log(error);
    }
}
