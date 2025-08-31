import { Sequelize } from 'sequelize';
import configData from './config.json';

const env = process.env.NODE_ENV || 'development';
const config = (configData as any)[env];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable] as string, config)
  : new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
