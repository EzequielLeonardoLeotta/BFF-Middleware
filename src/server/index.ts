import express from 'express';
import routes from '../routes/index';
import cors from 'cors';
import { dbConnection }  from '../database/config';

dbConnection()

const server = express();
server.use(express.json());

server.get('/', (_, res) => res.send('bff-middleware is up!'));
server.use(cors());
server.use('', routes);

export default server;