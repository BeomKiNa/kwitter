import dotenv from "dotenv";

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 172800)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  port: parseInt(required("PORT", 8080)),
  db: {
    host: required("MYSQL_HOST"),
    user: required("MYSQL_USER"),
    database: required("MYSQL_DATABASE"),
    password: required("MYSQL_PASSWORD"),
  },
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
};
