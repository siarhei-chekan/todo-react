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

  const editProject = (projectId, projectName) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, title: projectName };
        } else {
          return project;
        }
      })
    );
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));      
  };

  const createProjectItem = (projectId, projectItem) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            projectItems: [...project?.projectItems, projectItem],
          };
        } else {
          return project;
        }
      })
    );
  };

  const editProjectItem = (projectId, projectItem) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          const editedProjectItems = project?.projectItems.map((item) => {
            if (item.id === projectItem.id) {
              return { item, ...projectItem };
            } else {
              return item;
            }
          });
          return { ...project, projectItems: editedProjectItems };
        } else {
          return project;
        }
      })
    );
  };

  const deleteProjectItem = (projectId, projectItemId) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          const filteredProjectItems = project.projectItems.filter(
            (item) => item.id !== projectItemId
          );
          return { ...project, projectItems: filteredProjectItems };
        } else {
          return project;
        }
      })
    );
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        createProject,
        editProject,
        deleteProject,
        createProjectItem,
        editProjectItem,
        deleteProjectItem,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
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
