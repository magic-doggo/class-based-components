/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Count from './Count';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{task: 'Just some demo tasks', isCurrentlyEditing: false, id: 1}, 
        {task: 'As an example', isCurrentlyEditing: false, id: 2}],
      inputVal: '',
      nextId: 3,
      editedValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToDoDelete = this.handleToDoDelete.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditedValueChange = this.handleEditedValueChange.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleEditedValueChange(e) {
    this.setState((state) => ({
      ...state,
      editedValue: e.target.value,
    }))
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      todos: state.todos.concat({task: state.inputVal, isCurrentlyEditing: false, id: state.nextId}),
      inputVal: '',
      nextId: state.nextId+1,
    }));
  }

  handleToDoDelete(e) {
    this.setState((state) => ({
      todos: state.todos.filter(task => task !== e),
      inputVal: ''
    }))
  }

  handleEditClick(e) {
    this.setState((state) => ({
      ...state,
      editedValue: e.task,
      todos: this.state.todos.map(entry => {
        if (entry.id == e.id) {
          return {...entry, isCurrentlyEditing: true}
        } else return entry
      })
    }))
  }

  handleSubmitEdit(e) {
    this.setState((state) => ({
      ...state,
      todos: this.state.todos.map(entry => {
        if (entry.id == e.id) {
          return {...entry, isCurrentlyEditing: false, task: this.state.editedValue}
        } else return entry
      }),
      editedValue: ''
    }))
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.id}>
              {todo.isCurrentlyEditing ? (
                <input value={this.state.editedValue} onChange={this.handleEditedValueChange}/>
                ) : (<div>{todo.task}</div>)}

              {todo.isCurrentlyEditing ? 
              (<button onClick={() => this.handleSubmitEdit(todo)}>Save Changes</button>) : 
              (<button onClick={() => this.handleEditClick(todo)}>Edit</button>)}

              <button onClick={() => this.handleToDoDelete(todo)}>Delete</button>
            </li>
          ))}
        </ul>
        <Count count={this.state.todos.length}></Count>
      </section>
    );
  }
}

export default ClassInput;
