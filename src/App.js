import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    // get the todos from localstorage
    const storedTodos = localStorage.getItem("todos");
      // if there are todos stored
      if (storedTodos) {
        // return the parsed the JSON object back to a javascript object
        return JSON.parse(storedTodos);
        // otherwise
      } else {
        // return an empty array
        return [];
      }
    });
  const [inputValue, setInputValue] = useState(""); // set multiple values that are the same type

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // prevents blank to dos from being added
    if (inputValue === "") {
      return;
    }

    const newTodo = {
      id: new Date().getTime(), // todos.length + 1,
      text: inputValue,
      completed: false,
    };

    /**
     * The line of code setTodos([...todos, newTodo]); updates the todos state by adding a new todo item to the existing todos.
     * Here, setTodos is a function provided by the useState hook that allows us to update the state variable todos with a new value.
     * The new value of todos is an array created using the spread operator ...todos, which creates a copy of the existing todos array, 
     * and then adds the new todo item newTodo to the end of the copied array.
     * By calling setTodos with the updated array, React will re-render the component and display the new todo item in the UI.
     */
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleCheckboxChange = (event, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        // updating this todo with the new value of completed
        return {
          ...todo,
          completed: event.target.checked,
        };
      } else {
        return todo;
      }
    });

    // this will re-render this component
    setTodos(updatedTodos);
  };

  const handleDeleteClick = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} id="new-item-input" />
        <button type="submit" id="add-item-button">Add</button>
      </form>

      <ul id="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(event) => handleCheckboxChange(event, todo.id)}
            />
            {todo.text}
            <button onClick={() => handleDeleteClick(todo.id)} className="delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
