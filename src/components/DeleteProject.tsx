import { ProjectService } from "../API/ProjectService";

interface DeleteProjectProps {
  id: string;
  onProjectDeleted: () => void;
}

const DeleteProject = (props: DeleteProjectProps) => {
  function handleDelete() {
    ProjectService.delete(props.id);
    props.onProjectDeleted();
  }

  return <button onClick={handleDelete}>Usuń</button>;
};

export default DeleteProject;
