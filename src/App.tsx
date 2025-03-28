import ProjectList from "./components/ProjectList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowActiveProject from "./components/ShowActiveProject";
import Header from "./components/Header";
import AddStory from "./components/AddStory";

function App() {
  return (
    <>
      <div className="min-h-screen bg-[#1f1f1f] flex flex-col items-center justify-center text-white">
        <div className="w-full max-w-3xl bg-gray-900 rounded-lg shadow-lg">
          <Header />
          <Router>
            <Routes>
              <Route
                path="/ShowActiveProject"
                element={<ShowActiveProject />}
              />
              <Route path="/" element={<ProjectList />} />
              <Route path="/AddStory" element={<AddStory />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
