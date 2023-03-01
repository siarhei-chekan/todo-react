import React, { useContext } from "react";
import { ProjectModalContext } from "./Project";

const ProjectItem = ({ projectItem }) => {
  const { onClickDetailBtnHandler } = useContext(ProjectModalContext);

  return (
    <div className={`project-item ${projectItem.itemPriority}`}>
      <h3 className="project-item__name">{projectItem.itemTitle}</h3>
      <button
        type="button"
        className="project-item__detail-btn button"
        onClick={() => onClickDetailBtnHandler(projectItem)}
      >
        Details
      </button>
    </div>
  );
};

export default ProjectItem;
