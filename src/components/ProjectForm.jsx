import React, { useState } from "react";

const ProjectForm = ({ onClickAddBtnHandler }) => {
  const [projectTitle, setProjectTitle] = useState("");

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
        className="project-form__create-btn button"
        onClick={() => onClickAddBtnHandler(projectTitle, setProjectTitle)}
      >
        Add
      </button>
    </form>
  );
};

export default ProjectForm;
