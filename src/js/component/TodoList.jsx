import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    label: "string",
    is_done: false,
  });

  async function postUser() {
    const response = await fetch(
      "https://playground.4geeks.com/todo/users/marvinsojo",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      getTask();
    }
  }

  async function getTask() {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/marvinsojo"
      );
      if (response.status == 404) {
        postUser();
      } else {
        const data = await response.json();
        setTasks(data.todos);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange(e) {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  }

  async function handleKeyDown(e) {
    if (e.key.toLowerCase() === "enter" && e.target.value !== "") {
      e.target.value = "";
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/marvinsojo",
        {
          method: "POST",
          body: JSON.stringify(newTask),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      setTasks([...tasks, data]);
    }
  }

  async function handleDeleteTask(id) {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("No se pudo borrar la tarea :(");
      }
      const newInfoTasks = tasks.filter((element) => element.id !== id);
      setTasks(newInfoTasks);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteAllTask() {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/marvinsojo",
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        postUser();
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <input
          className="task-in container form-control fs-3 rounded-0 "
          type="text"
          name="label"
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder={tasks == "" ? "No tasks, add a task" : ""}
        />
        <ul className="container task-body px-1 m-0 justify-content-center">
          {tasks.map((task) => {
            return (
              <div
                key={task.id}
                className="container task-body-out d-flex justify-content-between align-items-center my-2 rounded"
              >
                <li className="fs-3">{task.label}</li>
                <button
                  className="delete btn rounded-circle text-light border-light my-2"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  X
                </button>
              </div>
            );
          })}
        </ul>
        <div className="efecto-pagina-2 mx-5 container"></div>
        <div className="efecto-pagina-3 mx-5 container"></div>
        <div>
          <button
            className="btn btn-outline-danger mt-3"
            onClick={() => handleDeleteAllTask()}
          >
            Delete All Tasks
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoList;
