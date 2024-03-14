import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')))

  function getData() {
    let data = [];
    if (localStorage.getItem('todos')) {
      data = JSON.parse(localStorage.getItem('todos'))
    }

    return data;
  }

  function handleClick(e) {
    e.preventDefault();
    const todo = {
      id: Date.now(),
      name: name,
      status: false,
    };

    let old = getData();
    old.push(todo);
    localStorage.setItem('todos', JSON.stringify(old));
    setName('');

    let copied = JSON.parse(JSON.stringify(todos));
    copied.push(todo);
    setTodos(copied);
  }

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !==  id));
  }

    return (
        <div className="todo">
          <Header></Header>
          <form>
            <input
              type="text"
              placeholder="Enter todo..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button onClick={handleClick} className="button">
              Submit
            </button>
          </form>
  
          <div className="todo-wrapper">
            {
              todos && todos.map((el, index) => {
                return (
                    <div key={index} className="todo-item">
                        <div className="block">
                          <input type="checkbox" name="" id="" />
                          <p>{el.name}</p>
                        </div>
  
                        <div className="actions">
                          <button className="btn btn-success">Edit</button>
                          <button className="btn btn-danger" onClick={deleteTodo}>Delete</button>
                        </div>
                    </div>
                );
              })
            }
  
          </div>
        </div>
    );
}

export default App;
