import React from "react";

const ProjectItem = ({ projectItem }) => {
  const handleOnClick = () => console.log("Details button clicked");

  return (
    <div className={`project-item ${projectItem.itemPriority}`}>
      <h3 className="project-item__name">{projectItem.itemTitle}</h3>
      <button
        type="button"
        className="project-item__detail-btn button"
        onClick={handleOnClick}
      >
        Details
      </button>
    </div>
  );
};

export default ProjectItem;
