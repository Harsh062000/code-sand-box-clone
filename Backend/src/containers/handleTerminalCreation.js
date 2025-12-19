export const handleTerminalCreation = (container, ws) => {
    container.exec({
        Cmd: ['/bin/bash'],
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        User: 'sandbox',
    }, (err, exec) => {
        if(err){
            console.log("Error  while creating exec", err);
            return;
        };

        exec.start({
            hijack: true,
            
        }, (err, stream) => {
            if(err){
                console.log("Error while staeting exec", err);
                return;
            };

            // step 1: stream processing
            processStreamOutput(stream, ws);
            // step 2: stream writting

            ws.on("message", (data) => {
                if(data === "getPort"){
                    container.inspect((err, data) => {
                        const port = data.NetworkSettings;
                        console.log("port", port);
                    });
                    return;
                }
                stream.write(data);
            })
        })
    })
};

function processStreamOutput(stream, ws){
    let nextDataType = null; // Store the type of the next message
    let nextDataLength = null; // Store  the length of the next message
    let buffer = Buffer.from("");

    function processStreamData(data){
        // This is a helper function to process incomming data chunks
        if(data){
            buffer = Buffer.concat([buffer, data]);
        }

        if(!nextDataType){
            // If the next data type is not known. then we need to read the next 8 byte to determine the type and length of the message

            if(buffer.length >= 8){
                const header = bufferSlicer(8);
                nextDataType = header.readUInt32BE(0); // this first 4 bytes represent the type of the message
                nextDataLength = header.readUInt32BE(4); //The next 4 bytes represent the length of the message

                processStreamData(); // recursively call the function to process the message
            }
        } else {
            if(buffer.length >= nextDataLength){
                const content = bufferSlicer(nextDataLength); // Slice the buffer to get  the message content   
                ws.send(content); //send the message to client(frontend)
                nextDataType = null; // reset the type and length for next message 
                nextDataLength = null;
            }
        }
    }

    function bufferSlicer(end){
        //this function slices the buffer and returns the slices buffer and the remaining buffer
        const output = buffer.slice(0, end); //header of the chunk
        buffer = Buffer.from(buffer.slice(end, buffer.length)); // remaining buffer

        return output;
    }

    stream.on("data", processStreamData);

}