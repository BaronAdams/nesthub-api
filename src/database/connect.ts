import sequelize from "./db";
import models from "./models";

export const connect = async () => {
    // Déclaration des relations
    Object.values(models).forEach((model) => {
        if ('associate' in model) {
            // @ts-ignore
            model.associate(models);
        }
    });
    
    try {
        await sequelize.authenticate();
        console.log("DATABASE CONNECTION SUCCESSFUL");
    } catch (error) {
        console.log(error);
    }
}
