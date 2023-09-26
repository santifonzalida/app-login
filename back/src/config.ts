import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    jwtSecret: process.env.JWT_SECRET,
    mailer: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
      from: process.env.MAIL_FROM,
      api_key: process.env.MAIL_API_KEY,
    },
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.AUTHDOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STOREGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDER_ID,
      appId: process.env.FIREBASE_APPID,
      measurementId: process.env.MEASUREMENT_ID,
    },
  };
});
