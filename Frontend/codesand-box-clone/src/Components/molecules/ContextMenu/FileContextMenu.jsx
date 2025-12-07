import "./FileContextMenu.css";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export const FileContextMenu = ({x, y, path}) => {

    const { setIsOpen } = useFileContextMenuStore();

    const { editorSocket } = useEditorSocketStore();

    function handleFileDelete(e){
        e.preventDefault();
        console.log("deleting file at", path);

        editorSocket.emit("deleteFile", {
            pathToFileOrFolder: path
        });
    }

    return (
        <div 
            className="fileContextOptionsWrapper"
            style={{
                left: x,
                top: y,
            }}
            onMouseLeave={() => {
                setIsOpen(false)
            }}
        
        >
            <button
                className="fileContextButton"
                onClick={(e) => handleFileDelete(e)}
            >Delete File</button>
            <button
                className="fileContextButton"
            >Rename File</button>
        </div>
    )
};