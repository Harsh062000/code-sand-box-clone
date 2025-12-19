import Docker from 'dockerode';
// import path from 'path';

const docker = new Docker();

export const listContainer = async () => {
    
    const container = await docker.listContainers();
    // console.log("containers List", container);

    // ports array from all containers
    container.forEach((conatainerInfo) => {
        console.log("conatainer Info", conatainerInfo.Ports);
    })
}

export const handleContainercreate = async (projectId, terimnalSocket, req, tcpSocket, head) => {
    console.log("project id received for container create ", projectId);

    try {
        const container = await docker.createContainer({
            Image: 'sandbox', // name given by us for the written dockerfile
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            Tty: true,
            User: 'sandbox',
            ExposedPorts: {
                "5173/tcp": {}
            },
            Env: ["HOST=0.0.0.0"],
            HostConfig: {
                Binds: [
                    // mounting the project directory to the constainer
                    `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings: {
                    "5173/tcp": [
                        {
                            "HostPort": "0" // random port will be assigned by docker
                        }
                    ] 
                },
            }
        });

        console.log("container created", container.id);

        await container.start();

        console.log("container started successfully");

        //place where we upgrade the connection to websocket
        terimnalSocket.handleUpgrade(req, tcpSocket, head, (establishedWSconnection) => {
            terimnalSocket.emit("connection", establishedWSconnection, req, container);
        });

        // container.exec({
        //     Cmd: [  "/bin/bash"],
        //     User: "sandbox",
        //     AttachStdin: true,
        //     AttachStdout: true,
        //     AttachStderr: true,
        // }, (err, exec) => {
        //     if(err){
        //         console.log("Error while creating exec", err);
        //         return;
        //     }

        //     exec.start({ hijack: true }, (err, stream) => {
        //         if(err){
        //             console.log("Error while starting exec", err);
        //             return;
        //         }
        //     });
        // });
    
    } catch (error) {
        console.error("Error creating container:", error);
    }
}

