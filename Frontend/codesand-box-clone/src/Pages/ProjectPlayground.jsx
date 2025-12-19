import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";

import EditorComponent from "../Components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../Components/atoms/EditorButton/EditorButton";
import TreeStructure from "../Components/organisms/TreeStructure/TreeStructure";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEditorSocketStore } from "../store/editorSocketStore";
import BrowserTerminal from "../Components/molecules/BrowserTerminal/BrowserTerminal.jsx";
import { useTerminalsocketStore } from "../store/terminalSocketStore.js";

function ProjectPlayground() {

  const {projectId: projectIdFromUrl} = useParams();

  const {setProjectId, projectId} = useTreeStructureStore();

  const { setEditorSocket, editorSocket } = useEditorSocketStore();

  const { setTerminalSocket } = useTerminalsocketStore();

  function fetchPort(){
    editorSocket.emit("getPort");
  }

  useEffect(() => {

    if(projectIdFromUrl){
      setProjectId(projectIdFromUrl);

      const editorSocketConnection = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
        query:{
          projectId: projectIdFromUrl
        }
      });

      const ws = new WebSocket("ws://localhost:3000/terminal?projectId=" + projectIdFromUrl);

      setTerminalSocket(ws);

      setEditorSocket(editorSocketConnection);

    }

  }, [projectIdFromUrl, setProjectId, setEditorSocket, setTerminalSocket]);

  return (
    <>
    <div
      style={{
        display: "flex",
      }}
    >

      { projectId && (
        <div
          style={{
            backgroundColor: "#333254",
            paddingRight: "10px",
            paddingTop: "0.3vh",
            minWidth: "250px",
            maxWidth: "25%",
            height: "99.7vh",
            overflow: "auto",

          }}
        >
          <TreeStructure />
        </div>
      )}

      <EditorComponent />
    
    </div>
      
      
      <EditorButton isActive={false}/>
      <EditorButton isActive={true}/>

      <div>
        <button
          onClick={fetchPort}
        >
          getPort
        </button>
      </div>
      <div>
        <BrowserTerminal />
      </div>
    </>
  )
}

export default ProjectPlayground;