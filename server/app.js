
import express from 'express';
import { router } from './routes/index.js';
import cors from 'cors';
import { ErrorHandler,removeStaleRecords } from './middlewares/index.js';
const app = express();
app.use(cors());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
app.use(removeStaleRecords);
app.use(router);
app.use(ErrorHandler);
//pool.query(`select 1 from dual`);



app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);