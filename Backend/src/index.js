import express from 'express';
import cors from 'cors';

import apiRouter from './routes/index.js';
import {PORT} from './config/serverConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Server is working!");
// });

app.use('/api', apiRouter)

// app.use('/ping', (req, res) => {
//     return res.json({message: 'pong'});
// });

app.listen(PORT, () => {
console.log(`server is running on port ${PORT}`);

});
