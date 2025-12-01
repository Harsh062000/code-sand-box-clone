import { useParams } from "react-router-dom";
import EditorComponent from "../Components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../Components/atoms/EditorButton/EditorButton";
import TreeStructure from "../Components/organisms/TreeStructure/TreeStructure";
import { useEffect } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore";

function ProjectPlayground() {

  const {projectId: projectIdFromUrl} = useParams();

  const {setProjectId, projectId} = useTreeStructureStore();

  useEffect(() => {

    setProjectId(projectIdFromUrl);

  }, [projectIdFromUrl, setProjectId]);

  return (
    <>
      Project Id is {projectIdFromUrl}
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
      <EditorButton isActive={false}/>
      <EditorButton isActive={true}/>
    </>
  )
}

export default ProjectPlayground;