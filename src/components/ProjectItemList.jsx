import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectItemList = ({ projectItemList }) => {
  return (
    <div className="project-item-list">
      {projectItemList && projectItemList.map((projectItem) => {
        return <ProjectItem key={projectItem.id} projectItem={projectItem} />;
      })}
    </div>
  );
};

export default ProjectItemList;
