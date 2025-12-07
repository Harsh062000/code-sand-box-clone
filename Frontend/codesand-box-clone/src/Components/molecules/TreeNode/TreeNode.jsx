import { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import FileIcons from "../../atoms/FileIcons/FileIcons";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";


function TreeNode({ fileFolderData }) {

  const [visibility, setVisibility] = useState({});

  const { editorSocket } = useEditorSocketStore();

  const { 
    setFile,
    setIsOpen: setFileContextMenuIsOpen,
    setX: setFileContextMenuX,
    setY: setFileContextMenuY
   } = useFileContextMenuStore();

  function toggleVisibility(name) {
    setVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  function handleDoubleClick(fileFolderData) {
    console.log("Double clicked on", fileFolderData);

    editorSocket.emit("readFile", {
        pathToFileOrFolder: fileFolderData.path
    })
  }

  function handleContextMenuForFiles(e, path){
    e.preventDefault();
    console.log("right clicked on", path, e);
    setFile(path);
    setFileContextMenuX(e.clientX);
    setFileContextMenuY(e.clientY);
    setFileContextMenuIsOpen(true);
  }

  const isVisible = visibility[fileFolderData?.name];
  const hasChildren = Array.isArray(fileFolderData?.children) && fileFolderData?.children.length > 0;

  return (
    <div
      style={{
        paddingLeft: "15px",
        color: "white",
      }}
    >
      {hasChildren ? (
        <button
          onClick={() => toggleVisibility(fileFolderData.name)}
          style={{
            border: "none",
            cursor: "pointer",
            outline: "none",
            background: "transparent",
            paddingTop: "10px",
            fontSize: "16px",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {isVisible ? (
            <IoIosArrowDown style={{ width: "12px", height: "12px" }} />
          ) : (
            <IoIosArrowForward style={{ width: "12px", height: "12px" }} />
          )}
          {fileFolderData?.name}
        </button>
      ) : (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "18px",
                paddingTop: "10px",
                gap: "4px"
            }}
            onContextMenu={(e) => handleContextMenuForFiles(e, fileFolderData.path)}
            onDoubleClick={() => handleDoubleClick(fileFolderData)}
        >
            {/* <FileIcons extension={fileFolderData?.name.split(".")[1]}/> */}
            <FileIcons extension={fileFolderData?.name} />
            <div
            style={{
                fontSize: "15px",
                cursor: "pointer",
                
            }}
            >
            {fileFolderData?.name}
            </div>
        </div>
      )}

      {isVisible &&
        hasChildren &&
        fileFolderData.children.map((child) => (
          <TreeNode fileFolderData={child} key={child.name} />
        ))}
    </div>
  );
}

export default TreeNode;
