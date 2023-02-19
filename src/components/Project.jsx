import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectItemForm from "./ProjectItemForm";
import Modal from "./UI/modal/Modal";
import ProjectItemList from "./ProjectItemList";
import { ProjectsContext } from "../App";

const Project = () => {
  const { projects } = useContext(ProjectsContext);

  const [project, setProject] = useState({}); //TODO убрать???
  const [projectItemList, setProjectItemList] = useState([]); //TODO убрать???
  const [isModalVisible, setModalVisibility] = useState(false);
  const params = useParams();

  useEffect(() => {
    const targetProject = projects.find((project) => project.id === +params.id);
    setProject(targetProject);//TODO убрать??? Для отображения брать из COntext!
    setProjectItemList(targetProject.projectItems);
  }, [params.id]);

  return (
    <div className="project">
      <Modal
        isModalVisible={isModalVisible}
        setModalVisibility={setModalVisibility}
      >
        <ProjectItemForm
          action={"create"}
          projectId={project.id}
          setModalVisibility={setModalVisibility}
        />
      </Modal>
      <h2 className="project__name">{project.title}</h2>
      <button
        type="button"
        className="project__create-btn button"
        onClick={() => setModalVisibility(true)}
      >
        New Item
      </button>
      <ProjectItemList projectItemList={projectItemList} />
    </div>
  );
};

export default Project;
