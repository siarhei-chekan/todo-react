import React, { useEffect, useState } from "react";

const ProjectForm = ({
  action,
  project,
  isModalVisible,
  onClickAddBtnHandler,
  onClickDeleteBtnHandler
}) => {
  const [projectTitle, setProjectTitle] = useState("");

  const addBtnClassName =
    action === "create"
      ? "project-form__create-btn create button"
      : "project-form__create-btn button";

  useEffect(() => {
    if (action === "edit" && isModalVisible) {
      setProjectTitle(project?.title);
    } else if (!isModalVisible) {
      setProjectTitle("");
    }
  }, [action, isModalVisible]);

  return (
    <form className="project-form" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        name="title"
        placeholder="Enter Project Name"
        className="project-form__title-input"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
      />
      <button
        type="button"
        className={addBtnClassName}
        onClick={() => onClickAddBtnHandler(project?.id, projectTitle)}
      >
        {action === "create" ? "Add" : "Save"}
      </button>
      {action === "edit" && (
        <button
          type="button"
          className="project-form__delete-button button"
          onClick={() => onClickDeleteBtnHandler(project?.id)}
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default ProjectForm;
