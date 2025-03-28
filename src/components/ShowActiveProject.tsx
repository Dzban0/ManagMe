import { useState, useEffect } from "react";
import { ProjectService } from "../API/ProjectService";
import { Story } from "../types/Story";
import { Link } from "react-router-dom";

const ShowActiveProject = () => {
  const activeProjectId = ProjectService.getActive();
  const activeProject = ProjectService.getById(activeProjectId!);

  const [stories, setStories] = useState<Story[]>([]);

  const projectStories = stories.filter(
    (story) => story.project === activeProjectId
  );

  const todoStories = projectStories.filter((story) => story.state === "todo");
  const doingStories = projectStories.filter(
    (story) => story.state === "doing"
  );
  const doneStories = projectStories.filter((story) => story.state === "done");

  useEffect(() => {
    setStories(ProjectService.getAllStories());
  }, []);

  return (
    <div className="w-max bg-[#1f1f1f] flex flex-col items-center justify-center text-white">
      <div className="bg-[#1f1f1f] flex flex-col items-center justify-center text-white">
        <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-xl">
          <div className="space-y-6">
            <div className="text-lg font-semibold text-gray-300">
              <span className="text-cyan-400">Nazwa projektu:</span>{" "}
              {activeProject?.name}
            </div>
            <div className="text-lg font-semibold text-gray-300">
              <span className="text-cyan-400">Opis:</span>{" "}
              {activeProject?.description}
            </div>

            <h3 className="text-xl font-bold text-white mt-4">📌 Historyjki</h3>

            <div>
              <h4 className="text-lg font-semibold text-white mt-4">
                🔲 Czekające na wykonanie
              </h4>
              {todoStories.length > 0 ? (
                <ul className="list-disc pl-6">
                  {todoStories.map((story) => (
                    <li key={story.id} className="text-gray-300">
                      <div className="font-semibold text-cyan-400">
                        {story.name}
                      </div>
                      <p>{story.description}</p>
                      <p>Priorytet: {story.priority}</p>
                      <p>Status: {story.state}</p>
                      <p>Autor: {story.owner}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Brak historyjek czekających na wykonanie.</p>
              )}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mt-4">
                ⚙️ Wykonywane
              </h4>
              {doingStories.length > 0 ? (
                <ul className="list-disc pl-6">
                  {doingStories.map((story) => (
                    <li key={story.id} className="text-gray-300">
                      <div className="font-semibold text-cyan-400">
                        {story.name}
                      </div>
                      <p>{story.description}</p>
                      <p>Priorytet: {story.priority}</p>
                      <p>Status: {story.state}</p>
                      <p>Autor: {story.owner}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Brak historyjek w trakcie wykonywania.</p>
              )}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mt-4">
                ✅ Zakończone
              </h4>
              {doneStories.length > 0 ? (
                <ul className="list-disc pl-6">
                  {doneStories.map((story) => (
                    <li key={story.id} className="text-gray-300">
                      <div className="font-semibold text-cyan-400">
                        {story.name}
                      </div>
                      <p>{story.description}</p>
                      <p>Priorytet: {story.priority}</p>
                      <p>Status: {story.state}</p>
                      <p>Autor: {story.owner}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Brak zakończonych historyjek.</p>
              )}
            </div>

            <div className="w-40 mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold">
              <Link to={"/AddStory"}>Dodaj historyjkę</Link>
            </div>
            <div className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold">
              <Link to={"/"}>Menu</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowActiveProject;
