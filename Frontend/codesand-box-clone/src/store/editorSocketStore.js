import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";

export const useEditorSocketStore = create((set) => {
    return {
        editorSocket: null,
        setEditorSocket: (incommingSocket) => {

        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;

        incommingSocket?.on("readFileSuccess", (data) => {
            console.log("REad file success data", data);
            const fileExtention = data.path.split(".").pop();
            activeFileTabSetter(data.path, data.value, fileExtention);
        });
        
        incommingSocket?.on("writeFileSuccess", (data) => {
            console.log("write file success", data);
            // incommingSocket.emit("readFile", {
            //     pathToFileOrFolder: data.path
            // });
        });

        incommingSocket?.on("deletedFileSuccess", () => {
            projectTreeStructureSetter();
        })

        set({
            editorSocket: incommingSocket
        });
    }
    }
});