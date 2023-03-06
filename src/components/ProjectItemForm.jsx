import React, { useContext, useEffect, useState } from "react";
import { ProjectsContext } from "../App";

const ProjectItemForm = ({
  action,
  projectId,
  isModalVisible,
  setModalVisibility,
  projectItem,
}) => {
  const { createProjectItem, editProjectItem, deleteProjectItem } =
    useContext(ProjectsContext);

  const [itemTitle, setItemTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [itemPriority, setItemPriority] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemStatus, setItemStatus] = useState("notDone");

  useEffect(() => {
    if (action === "edit" && isModalVisible) {
      setItemTitle(projectItem?.itemTitle);
      setDeadline(projectItem?.deadline);
      setItemPriority(projectItem?.itemPriority);
      setItemDescription(projectItem?.itemDescription);
      setItemStatus(projectItem?.itemStatus);
    } else if (!isModalVisible) {
      resetForm();
    }
  }, [action, isModalVisible]);

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
    const item = {
      itemTitle,
      deadline,
      itemPriority,
      itemDescription,
      itemStatus,
    };

    if (action === "create") {
      createProjectItem(projectId, { id: Date.now(), ...item });
    } else if (action === "edit") {
      editProjectItem(projectId, { id: projectItem.id, ...item });
    }

    setModalVisibility(false);
    resetForm();
  }
  function statusBtnOnClickHandler() {
    itemStatus === "notDone" ? setItemStatus("done") : setItemStatus("notDone");
  }

  function deleteBtnOnClickHandler() {
    deleteProjectItem(projectId, projectItem.id);
    setModalVisibility(false);
    resetForm();
  }

  function resetForm() {
    setItemTitle("");
    setDeadline("");
    setItemPriority("");
    setItemDescription("");
    setItemStatus("notDone");
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
        {action === "edit" && (
          <button
            type="button"
            className={`project-item-form__mark-button ${itemStatus} button`}
            onClick={() => statusBtnOnClickHandler()}
          >
            {itemStatus === "notDone" ? "Done" : "Not Done"}
          </button>
        )}
        {action === "edit" && (
          <button
            type="button"
            className="project-item-form__delete-button button"
            onClick={() => deleteBtnOnClickHandler()}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectItemForm;
