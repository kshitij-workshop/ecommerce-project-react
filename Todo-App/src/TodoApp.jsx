import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  let addTask = () => {
    setTasks((prevTasks) => {
      return [...prevTasks, { todo: newTodo, id: uuidv4() }];
    });
    setNewTodo("");
  };

  let updateNewTodo = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
     setTasks(tasks.filter((task) => task.id != id))
  };

  let toUpperCaseAll = () => {
      setTasks((prevTasks) => (
        prevTasks.map((task) => {
          return {
            ...task, 
            todo : task.todo.toUpperCase()
          }
        })
      ))  
  } 

  let UpperCaseOne = (id) => {
    setTasks((tasks) => (
        tasks.map((task) => {
          if(task.id == id) {
          return {
            ...task, 
            todo : task.todo.toUpperCase()
          }
        } else{
          return task
        }
        })
      ))
  }

  return (   
    <>
      <input
        type="text"
        placeholder="enter a task"
        value={newTodo}
        onChange={updateNewTodo}
      />
      <br /> <br />
      <button onClick={addTask}>Add Task</button>
      <br /> <br /> <br /> <br />
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.todo}</span>
            &nbsp;&nbsp; &nbsp;
            <button onClick={() => deleteTodo(task.id)}>Delete</button>
            <button onClick={() => UpperCaseOne(task.id)}>UpperCase</button>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <button onClick={toUpperCaseAll}>UpperCase All</button>
    </>
  );
}
