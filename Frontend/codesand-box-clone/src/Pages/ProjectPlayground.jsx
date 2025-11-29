import { useParams } from "react-router-dom";
import EditorComponent from "../Components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../Components/atoms/EditorButton/EditorButton";

function ProjectPlayground() {

  const {projectId} = useParams();

  return (
    <>
      Project Id is {projectId}
      <EditorComponent />
      <EditorButton isActive={false}/>
      <EditorButton isActive={true}/>
    </>
  )
}

export default ProjectPlayground;