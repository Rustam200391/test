/* eslint-disable react/prop-types */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../store/actions";

export const EditTask = ({taskId, onSubmit}) => {
  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()
  const task = tasks.find((item) => item.id === parseInt(taskId));

  const [taskName, setTaskName] = useState(task?.name);
  const [taskDescription, setTaskDescription] = useState(task?.description);

  if(!task) return <div>Task not found</div>

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(editTask(task.id, {...task, name: taskName, description: taskDescription}))
    if(onSubmit) onSubmit()
    // Здесь вы можете добавить логику для обновления данных задачи
  };

  return (
    <div>
      <h1>Редактирование задачи {taskId}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskName">Название задачи:</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={handleTaskNameChange}
          />
        </div>
        <div>
          <label htmlFor="taskDescription">Описание задачи:</label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
          />
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};
