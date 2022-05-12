import MongoDb from "mongodb";
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

export async function connectDB() {
  return MongoDb.MongoClient.connect(host).then((client) => client.db());
}
