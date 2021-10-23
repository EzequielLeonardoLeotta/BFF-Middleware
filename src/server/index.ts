import express from 'express';
import routes from '../routes/index';
import cors from 'cors';
import { dbConnection }  from '../database/config';

// Swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "../swaggerOptions";

const specs = swaggerJsDoc(options);

dbConnection()

const server = express();
server.use(express.json());

server.get('/', (_, res) => res.send('bff-middleware is up!'));
server.use(cors());
server.use('', routes);
server.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default server;