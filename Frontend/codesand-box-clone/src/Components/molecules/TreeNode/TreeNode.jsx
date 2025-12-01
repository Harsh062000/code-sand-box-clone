// import { useState } from "react";
// import { IoIosArrowForward , IoIosArrowDown} from "react-icons/io";

// function TreeNode({
//     fileFolderData
// }) {

//     const [visibility, setVisibility] = useState({});

//     function toggleVisibility(name){
//         setVisibility({
//             ...visibility,
//             [name]: !visibility[name]


//         });
//     }

//     return (
//         ( fileFolderData?.children && <div 
//             style={{
//                 paddingLeft: "15px",
//                 color: "white" 
//             }}
//         >
//             {fileFolderData.children ? (

//                 <button
//                     onClick={() => toggleVisibility(fileFolderData.name)}
//                     style={{
//                         border: "none",
//                         cursor: "pointer",
//                         outline: "none",
//                         color: "black",
//                         // backgroundColor: "transparent",
//                         paddingTop: "15px",
//                         fontSize: "16px"
//                     }}
//                 >
//                     <IoIosArrowForward style={{
//                         height: "10px",
//                         width: "10px"
//                     }}/>
//                     {fileFolderData.name}
//                 </button>
//             ) : (
//                 <div 
//                     style={{
//                         paddingTop: "10px",
//                         fontSize: "15px",
//                         cursor: "pointer",
//                         marginLeft: "5px",
//                         color: "black"

//                     }}
//                 >{fileFolderData.name}</div>
//             )}
//             {
//                 visibility[fileFolderData.name] && fileFolderData.children && (
//                     fileFolderData.children.map((child) => {
//                         return (
//                             <TreeNode 
//                                 fileFolderData={child} 
//                                 key={child.name}
//                             />
//                         )
//                     })
//                 )
//             }
//         </div> )
//   )
// }

// export default TreeNode;

import { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import FileIcons from "../../atoms/FileIcons/FileIcons";

function TreeNode({ fileFolderData }) {
  const [visibility, setVisibility] = useState({});

  function toggleVisibility(name) {
    setVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
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
