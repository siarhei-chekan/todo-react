import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectItemForm from "./ProjectItemForm";
import Modal from "./UI/modal/Modal";
import ProjectItemList from "./ProjectItemList";
import { ProjectsContext } from "../App";

export const ProjectModalContext = createContext();

const Project = () => {
  const { projects } = useContext(ProjectsContext);

  const [project, setProject] = useState(null);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [action, setAction] = useState("");
  const [targetProjectItem, setTargetProjectItem] = useState(null);
  const params = useParams();

  const onClickNewItemBtnHandler = () => {
    setAction("create");
    setModalVisibility(true);
  };

  const onClickDetailBtnHandler = (projectItem) => {
    setAction("edit");
    setTargetProjectItem(projectItem);
    setModalVisibility(true);
  };

  useEffect(() => {
    const targetProject = projects.find((project) => project.id === +params.id);
    setProject(targetProject);
  }, [params.id]);

  if (!project) {
    return null;
  }

  return (
    <div className="project">
      <Modal
        isModalVisible={isModalVisible}
        setModalVisibility={setModalVisibility}
      >
        <ProjectItemForm
          action={action}
          projectId={project.id}
          isModalVisible={isModalVisible}
          setModalVisibility={setModalVisibility}
          projectItem={targetProjectItem}
        />
      </Modal>
      <h2 className="project__name">{project.title}</h2>
      <button
        type="button"
        className="project__create-btn button"
        onClick={() => onClickNewItemBtnHandler()}
      >
        New Item
      </button>
      <ProjectModalContext.Provider value={{ onClickDetailBtnHandler }}>
        <ProjectItemList projectItemList={project.projectItems} />
      </ProjectModalContext.Provider>
    </div>
  );
};

export default Project;
