import React, { useState } from 'react';
import Count from './Count';

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {

  const [todos, setTodos] = useState([{ task: 'Just some demo tasks', isCurrentlyEditing: false },
  { task: 'As an example', isCurrentlyEditing: false }]);
  const [inputVal, setInputVal] = useState('');

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setTodos((todo) => [...todo, inputVal]);
    setTodos((todo) => [...todo, { task: inputVal, isCurrentlyEditing: false }]);
    setInputVal('');
  };

  return (
    <section>
      <h3>{name}</h3>
      <form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.task}>
            {todo.isCurrentlyEditing ? (<input type='text' />) : (<div>{todo.task} aaaa</div>)}
            {/* <div>{todo.task} aaaa</div> */}

            {todo.isCurrentlyEditing ? (
              <button onClick={() => {
                setTodos(todos.map(entry => {
                  if (entry.task == todo.task) {
                    return { task: entry.task, isCurrentlyEditing: false }
                  } else return entry
                }))
              }}>Submit</button>) : (
                <button onClick={() => {
                  setTodos(todos.map(entry => {
                    if (entry.task == todo.task) {
                      return { task: entry.task, isCurrentlyEditing: true }
                    } else return entry
                  }))
                }}>Edit</button>    
            )}

            {/* <button onClick={() => {
              setTodos(todos.map(entry => {
                if (entry.task == todo.task) {
                  console.log("asdddddddd");
                  return { task: entry.task, isCurrentlyEditing: true }
                } else return entry
              }))
            }}>Edit</button> */}

            <button onClick={() => {
              setTodos(todos.filter(entry => entry.task !== todo.task))
            }}>Delete</button>
          </li>
        ))}
      </ul>
      <Count count={todos.length}></Count>
    </section>
  );
};

export default FunctionalInput;
