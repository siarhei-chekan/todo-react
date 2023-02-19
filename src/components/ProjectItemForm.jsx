import React, { useContext, useState } from "react";
import { ProjectsContext } from "../App";

const ProjectItemForm = ({ action, projectId, setModalVisibility }) => {
  const { createProjectItem } = useContext(ProjectsContext);

  const [itemTitle, setItemTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [itemPriority, setItemPriority] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const options = [
    { value: "", name: "Select Priority", disabled: true },
    { value: "low", name: "Low Priority", className: "low" },
    { value: "medium", name: "Medium Priority", className: "medium" },
    { value: "high", name: "High Priority", className: "high" },
  ];

  const addBtnClassName =
    action === "create"
      ? "project-item-form__add-button create button"
      : "project-item-form__add-button button";

  function handleOnClick(action) {
    console.log(`Form is ${action}!`);
    createProjectItem(projectId, {
      id: Date.now(),
      itemTitle,
      deadline,
      itemPriority,
      itemDescription,
    });
    setModalVisibility(false);
    resetForm();
  }

  function resetForm() {
    setItemTitle("");
    setDeadline("");
    setItemPriority("");
    setItemDescription("");
  }

  return (
    <form className="project-item-form">
      <h3 className="project-item-form__title">{itemTitle}</h3>
      <input
        type="text"
        name="title"
        placeholder="Item Title"
        className="project-item-form__title-input"
        value={itemTitle}
        onChange={(e) => setItemTitle(e.target.value)}
      />
      <input
        type="date"
        name="date"
        placeholder="dd/mm/yy"
        className="project-item-form__date-input"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <select
        className={`project-item-form__priority ${itemPriority}`}
        value={itemPriority}
        onChange={(e) => setItemPriority(e.target.value)}
      >
        {options.map((option) => {
          return (
            <option
              className={option.className}
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.name}
            </option>
          );
        })}
      </select>
      <textarea
        className="project-item-form__item-description"
        placeholder="Item Description"
        value={itemDescription}
        onChange={(e) => setItemDescription(e.target.value)}
      ></textarea>
      <div className="project-item-form__btn-container">
        <button
          type="button"
          className={addBtnClassName}
          onClick={() => handleOnClick(action)}
        >
          {action === "create" ? "Add" : "Save"}
        </button>
        <button type="button" className="project-item-form__mark-button button">
          Mark Done/Not Done
        </button>
        <button
          type="button"
          className="project-item-form__delete-button button"
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default ProjectItemForm;
