import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStore'
import TreeNode from '../../molecules/TreeNode/TreeNode';
// import { useParams } from 'react-router-dom';

function TreeStructure() {

    // const { projectId } = useParams();

    const { treeStructure, setTreeStructure } = useTreeStructureStore();

    useEffect(() => {

        if(treeStructure){
            console.log("tree-structre:",treeStructure);
        }else{
            setTreeStructure();
        }

    }, [setTreeStructure, treeStructure])

  return (
    <>
        <div>TreeStructure</div>
        <TreeNode fileFolderData={treeStructure} />
    </>
  )
}

export default TreeStructure