/* eslint-disable react/prop-types */
import { useState } from "react";
import "./TaskList.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, filterTasks, toggleTask } from "../store/actions";

export const TaskList = ({ setRightBlockState }) => {
  const { tasks, filter } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(""); // Состояние для хранения названия задачи

  const addTaskHandler = () => {
    if (taskName.trim() !== "") {
      // Создание новой задачи
      const newTask = {
        id: tasks.length + 1,
        name: taskName,
        description: "",
        completed: false,
      };

      // Отправка новой задачи в хранилище Redux
      dispatch(addTask(newTask));

      // Сброс поля ввода
      setTaskName("");
    }
  };

  const toggleTaskHandler = (id) => {
    dispatch(toggleTask(id));
  };

  const deleteTaskHandler = (id) => {
    dispatch(deleteTask(id));
  };

  const filterTasksHandler = (filterType) => {
    dispatch(filterTasks(filterType));
  };
  const editTask = (id) => {
    setRightBlockState({ id, type: "edit" });
  };
  const taskDetail = (id) => {
    setRightBlockState({ id, type: "detail" });
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed);

  return (
    <>
      <div>
        <h1>Список задач</h1>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Введите название задачи"
        />
        <button onClick={addTaskHandler}>Добавить задачу</button>
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskHandler(task.id)}
              />
              <span
                style={{
                  marginLeft: "8px",
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => taskDetail(task.id)}
              >
                {task.name}
              </span>
              <button onClick={() => editTask(task.id)}>Редактировать</button>
              <button onClick={() => deleteTaskHandler(task.id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
        <div>
          <h3>Фильтр:</h3>
          <button onClick={() => filterTasksHandler("all")}>
            Показать все
          </button>
          <button onClick={() => filterTasksHandler("completed")}>
            Показать проделанные
          </button>
          <button onClick={() => filterTasksHandler("uncompleted")}>
            Показать несделанные
          </button>
        </div>
      </div>
    </>
  );
};
