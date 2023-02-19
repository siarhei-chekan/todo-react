import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectsContext } from "../App";
import ProjectForm from "./ProjectForm";
import Modal from "./UI/modal/Modal";

const SideBar = ({ open, hideSidebar }) => {
  const { projects, createProject } = useContext(ProjectsContext);
  const [isModalVisible, setModalVisibility] = useState(false);

  let className = "sidebar";
  className = open ? `${className} open` : "sidebar";

  const onClickAddBtnHandler = (projectName, setProjectTitle) => {
    if (!projectName) {
      return;
    }

    createProject(projectName);
    setProjectTitle("");
    setModalVisibility(false);
  };

  return (
    <div className={className}>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisibility={setModalVisibility}
      >
        <ProjectForm onClickAddBtnHandler={onClickAddBtnHandler} />
      </Modal>
      <h3 className="sidebar__title">Projects</h3>
      <button
        type="button"
        className="sidebar__create-btn button"
        onClick={() => setModalVisibility(true)}
      >
        New Project
      </button>
      <div className="projects-list">
        {projects.map((project) => (
          <Link
            className="project-link button"
            to={`projects/${project.id}`}
            key={project.id}
            onClick={hideSidebar}
          >
            {project.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
