import React, { useState, useReducer } from "react";
import "./App.css";
const ACTIONS = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};

const tasksOperators = (tasks, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        ...tasks,
        { id: Date.now(), name: action.payload.name, complete: false },
      ];
    case ACTIONS.TOGGLE:
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, complete: !task.complete };
        }
        return task
      });
    case ACTIONS.DELETE:
      return tasks.filter((task) => task.id !== action.payload.id);

    default:
      return tasks;
  }
};

const App = () => {
  const [tasks, dispatch] = useReducer(tasksOperators, []);
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD, payload: { name: taskName } });
    setTaskName("");
  };
  return (
    <section className="main">
      <div>
        <p>Register your Task</p>
        <form onSubmit={handleSubmit}>
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            autoComplete="off"
            type="text"
            placeholder="Enter you task"
            className="input"
            onSubmit={handleSubmit}
          />
        </form>
        {tasks.map((task) => {
          return <ShowTasks key={task.id} task={task} dispatch={dispatch} />;
        })}
      </div>
    </section>
  );
};

const ShowTasks = ({ task, dispatch }) => {
  return (
    <>
      <div className="todo">
        <input
          type="checkbox"
          onClick={() =>
            dispatch({ type: ACTIONS.TOGGLE, payload: { id: task.id } })
          }
        />
        <span
          style={{
            textDecoration: task.complete ? "line-through" : "none",
            color: task.complete ? "gray" : "black",
          }}
        >
          {" "}
          {task.name}{" "}
        </span>
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.DELETE, payload: { id: task.id } })
          }
        >
          delete
        </button>
        <br />
      </div>
    </>
  );
};

export default App;
