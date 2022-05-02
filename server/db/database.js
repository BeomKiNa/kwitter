import { config } from "../config.js";
import SQ from "sequelize";

const {
  db: { host, user, database, password, port },
} = config;

export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: false,
});
