import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectsContext } from "../App";
import ProjectForm from "./ProjectForm";
import Modal from "./UI/modal/Modal";

const SideBar = ({ open, hideSidebar }) => {
  const { projects, createProject, editProject, deleteProject } = useContext(ProjectsContext);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [action, setAction] = useState("");
  const [targetProject, setTargetProject] = useState(null);

  let className = "sidebar";
  className = open ? `${className} open` : "sidebar";

  const onClickNewBtnHandler = () => {
    setAction("create");
    setModalVisibility(true);
  };

  const onClickAddBtnHandler = (projectId, projectName) => {
    if (!projectName) {
      return;
    }

    if (action === "create") {
      createProject(projectName);
    } else if (action === "edit") {
      editProject(projectId, projectName);
    }

    setModalVisibility(false);
  };

  const onClickEditBtnHandler = (e, project) => {
    e.stopPropagation();
    e.preventDefault();
    setAction("edit");
    setTargetProject(project);
    setModalVisibility(true);
  };

  const onClickDeleteBtnHandler = (projectId) => {
    deleteProject(projectId);
    setModalVisibility(false);
  }

  return (
    <div className={className}>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisibility={setModalVisibility}
      >
        <ProjectForm
          action={action}
          isModalVisible={isModalVisible}
          project={targetProject}
          onClickAddBtnHandler={onClickAddBtnHandler}
          onClickDeleteBtnHandler={onClickDeleteBtnHandler}
        />
      </Modal>
      <h3 className="sidebar__title">Projects</h3>
      <button
        type="button"
        className="sidebar__create-btn button"
        onClick={() => onClickNewBtnHandler()}
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
            <div
              className="project-link__editBtn"
              onClick={(e) => onClickEditBtnHandler(e, project)}
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
