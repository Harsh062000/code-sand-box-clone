import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStore';
import { useFileContextMenuStore } from '../../../store/fileContextMenuStore'; 
import TreeNode from '../../molecules/TreeNode/TreeNode';
import { FileContextMenu } from '../../molecules/ContextMenu/FileContextMenu';
// import { useParams } from 'react-router-dom';

function TreeStructure() {

    // const { projectId } = useParams();

    const { treeStructure, setTreeStructure } = useTreeStructureStore();

    const { 
            file,
            isOpen: isFileContextOpen,
            x: fileContextX,
            y: fileContextY
        } = useFileContextMenuStore();

    useEffect(() => {

        if(treeStructure){
            console.log("tree-structre:",treeStructure);
        }else{
            setTreeStructure();
        }

    }, [setTreeStructure, treeStructure])

  return (
    <>  
        {isFileContextOpen && fileContextX && fileContextY && (
            <FileContextMenu 
                x={fileContextX}
                y={fileContextY}
                path={file}
            />
        )}
        <TreeNode fileFolderData={treeStructure} />
    </>
  )
}

export default TreeStructure