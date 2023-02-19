import { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Project from "./components/Project";
// import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";

export const ProjectsContext = createContext();

function App() {
  const [projects, setProjects] = useState([]);

  const createProject = (projectName) => {
    const project = {
      id: Date.now(),
      title: projectName,
      projectItems: [],
    };
    setProjects([...projects, project]);
  };

  const createProjectItem = (projectId, projectItem) => {
    const targetProject = projects.find((project) => project.id === projectId);
    targetProject.projectItems.push(projectItem);
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, createProject, createProjectItem }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path='/projects' element={<Home />}>
            <Route path='/projects/:id' element={<Project />} />
          </Route> */}
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProjectsContext.Provider>
  );
}

export default App;
