import express from 'express';
import cors from 'cors';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import chokidar from 'chokidar';
import path from 'path';

import apiRouter from './routes/index.js';
import {PORT} from './config/serverConfig.js';
import { handlEditorSocketEvents } from './socketHandlers/editorHandler.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('diconnect', () => {
//         console.log('user disconnected');
//     })
// })

// app.get("/", (req, res) => {
//   res.send("Server is working!");
// });

app.use('/api', apiRouter)

// app.use('/ping', (req, res) => {
//     return res.json({message: 'pong'});
// });

const editorNameSpace = io.of('/editor');

editorNameSpace.on("connection", (socket) => {
    console.log("editor connected");

    //some how we will get the project id from frontend here
    
    // console.log(socket.handshake.query['projectId']);

    let projectId = socket.handshake.query['projectId'];

    if(projectId){
        var watcher = chokidar.watch(`./projects/${projectId}`, {
            ignored: (path) => path.includes("node_modules"),
            persistent: true, /* keeps the watcher in running statetill the time app is running */
            awaitWriteFinish: {
                stabilityThreshold: 2000, /* Ensures stability of files before triggering events*/
            },
            ignoreInitial: true, /* Ignores the initial files in the directory*/
        });

        watcher.on("all", (event, path) => {
            console.log(event, path);
        });
    }

    handlEditorSocketEvents(socket);

    socket.on("disconnect", async () => {
        await watcher.close();
        console.log("editor disconnected");
    });
})

server.listen(PORT, () => {
console.log(`server is running on port ${PORT}`);

});
