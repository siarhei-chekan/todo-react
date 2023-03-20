import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Project from "./components/Project";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";

export const ProjectsContext = createContext();

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("auth")) {
      setIsAuth(true);
    }
  }, []);

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
        isAuth,
        setIsAuth
      }}
    >
      <BrowserRouter>
        {isAuth ? (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/*" element={<NoPage />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />}>
              <Route path="*" element={<Login />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </ProjectsContext.Provider>
  );
}

export default App;
