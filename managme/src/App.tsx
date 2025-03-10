import { useState } from "react";
import { ProjectForm } from "./components/ProjectForm";
import { ProjectList } from "./components/ProjectList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    //
    <div>
      <h1>ManagMe - Zarządzanie Projektami</h1>
      <ProjectForm onProjectAdded={() => setRefresh(!refresh)} />
      <ProjectList key={refresh ? "refresh1" : "refresh2"} />
    </div>
  );
}

export default App;
