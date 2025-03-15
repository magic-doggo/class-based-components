import React, { useState } from 'react';
import Count from './Count';

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {

  const [todos, setTodos] = useState([{ task: 'Just some demo tasks', isCurrentlyEditing: false, id: 1 },
  { task: 'As an example', isCurrentlyEditing: false, id: 2 }]);
  const [inputVal, setInputVal] = useState('');
  const [nextId, setNextId] = useState(3)
  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const [editedValue, setEditedValue] = useState('');
  const handleEditedChange = (e) => {
    setEditedValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, { task: inputVal, isCurrentlyEditing: false, id: nextId }]);
    setInputVal('');
    setNextId(nextId + 1)
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
          <li key={todo.id}>
            {todo.isCurrentlyEditing ? (
              <input type='text' value={editedValue} onChange={handleEditedChange}/>
              ) : (<div>{todo.task}</div>)}
            {/* make the above editable. probably need some id for key or some way to access state to set it as value above
            or create new state. and assign it the value of todo.task 
            easier if can only edit one submission at a time. pressing edit should close other edits (set their iscurrentlyediting to true,
            and either discard or submit changes. probably submit*/}

            {todo.isCurrentlyEditing ? (
              <button onClick={() => {
                setTodos(todos.map(entry => {
                  if (entry.id == todo.id) {
                    return { ...entry, isCurrentlyEditing: false, task:editedValue }
                  } else return entry
                }))
              }}>Save Change</button>) : (
                <button onClick={() => {
                  setEditedValue(todo.task)
                  setTodos(todos.map(entry => {
                    if (entry.id == todo.id) {
                      return { ...entry, isCurrentlyEditing: true }
                    } else return entry
                  }))
                }}>Edit</button>    
            )}

            <button onClick={() => {
              setTodos(todos.filter(entry => entry.id !== todo.id))
            }}>Delete</button>
          </li>
        ))}
      </ul>
      <Count count={todos.length}></Count>
    </section>
  );
};

export default FunctionalInput;
