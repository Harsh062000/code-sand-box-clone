// import { useParams } from "react-router-dom";
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css'; //required styles from xterm
import { AttachAddon } from '@xterm/addon-attach';
import { useEffect, useRef } from 'react';

import { useTerminalsocketStore } from "../../../store/terminalSocketStore";


function BrowserTerminal() {

    // const {projectId: projectIdFromUrl} = useParams();

    const terminalRef = useRef(null);
    // const socket = useRef(null);
    // const ws = new WebSocket("ws://localhost:3000/terminal?projectId=" + projectIdFromUrl);
    const { terminalsocket } = useTerminalsocketStore();

    useEffect(() => {
        const term = new Terminal({
            cursorBlink: true,
            theme: {
                background: "#282a37",
                foreground: "#f8f8f3",
                cursor: "#f8f8f3",
                cursorAccent: "#282a37",
                red: "#ff5544",
                green: "#50fa7c",
                yellow: "#f1fa8c",
                cyan: "#8be9fd",
            },
            fontSize: 16,
            fontFamily: '"Fira Code", monospace',
            convertEol: true, // convert CRLF to LF
        });

        
        let fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        term.open(terminalRef.current);

        fitAddon.fit();

        // socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`, {
        //     query: {
        //         projectId: projectIdFromUrl,
        //     }
        // });

        //new raw WebSocket implementation for socket connection

        if(terminalsocket){
            terminalsocket.onopen = () => {
            const attachAddon = new AttachAddon(terminalsocket);
            term.loadAddon(attachAddon);
        }
        }

        /*

        previous socket implementation using socket.io
        // socket.current.on("shell-output", (data) => {
        //     term.write(data);
        // });

        // term.onData((data) => {
        //     console.log(data);
        //     socket.current.emit("shell-input", data);
        // });

        */

        return () => {
            term.dispose();
            // socket.current.disconnect();
        }
    }, [terminalsocket]);

  return (
    <div
        ref={terminalRef}
        style={{
            height: "25vh",
            overflow: "auto",
            width: "100vw",
        }}
        className="terminal"
        id="terminal-container"
    >
        
    </div>
  )
}

export default BrowserTerminal