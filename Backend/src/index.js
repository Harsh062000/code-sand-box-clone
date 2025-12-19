import express from 'express';
import cors from 'cors';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import chokidar from 'chokidar';
import path from 'path';
import { WebSocketServer } from 'ws';

import apiRouter from './routes/index.js';
import {PORT} from './config/serverConfig.js';
import { handlEditorSocketEvents } from './socketHandlers/editorHandler.js';
import { handleContainercreate, listContainer } from './containers/handleContainerCreate.js';
import { handleTerminalCreation } from './containers/handleTerminalCreation.js';


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

    socket.on("getPort", () => {
        console.log("get port even received");
        listContainer();
    })
    

    handlEditorSocketEvents(socket, editorNameSpace);

    socket.on("disconnect", async () => {
        await watcher.close();
        console.log("editor disconnected");
    });
});

// const terminalNameSpace = io.of('/terminal');
// terminalNameSpace.on("connection", (socket) => {
//     console.log("terminal connected");

//     let projectId = socket.handshake.query['projectId'];

//     // socket.on("shell-input", (data) => {
//     //     console.log("input recevied", data);
//     //     terminalNameSpace.emit("shell-output", data);
//     // });

//     socket.on("disconnect", () => {
//         console.log("termiinal disconnected");
//     });

//     handleContainercreate(projectId, socket);
// })

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

const webSocketForTerminal = new WebSocketServer({
    noServer: true, //we will handle the upgrade event from http to tcp for socket manually
});

server.on("upgrade", (req, tcpSocket, head) => {
    /*
    req: incoming http request
    socket: TCP socket 
    head: buffer containing the first packet of the upgraded stream
    */
    //this callback will be called when a client tries to connect to the server through websocket
    const isTermianl = req.url.includes("/terminal");

    if(isTermianl){
        console.log(req.url);
        const projectId = req.url.split("=")[1];
        console.log(projectId);

        handleContainercreate(projectId, webSocketForTerminal, req, tcpSocket, head);
    }
});

webSocketForTerminal.on("connection", (ws, req, container) => {
    console.log("terminal connected", ws, req, container);
    handleTerminalCreation(container, ws);

    

    ws.on("close", () => {
        container.remove({
            force: true
        }, (err, data) => {
            if(err){
                console.log("Error while removing container", err);
            }

            console.log("container removed", data)
        })
    })
})
