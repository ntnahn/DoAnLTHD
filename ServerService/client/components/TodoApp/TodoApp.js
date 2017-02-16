import React, {Component, PropTypes} from 'react';
import TodoItem from './TodoItem';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [
        {
          name: 'Do home works',
          done: false
        },
        {
          name: 'Làm bài tập nhóm',
          done: true
        },
        {
          name: 'Listen to music...',
          done: true
        }
      ],
      todoName: ''
    };
    this.setText = this.setText.bind(this);
    this.handleAddNewTodo = this.handleAddNewTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleCheckTodo = this.handleCheckTodo.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }
  setText(event) {
    this.setState({todoName: event.target.value});
  }
  handleAddNewTodo() {
    if ( this.state.todoName === '' ) {
      alert('Please enter your task name!');
      return;
    }
    let newTodo = {
      name: this.state.todoName,
      done: false
    };
    let todoItems = this.state.todoItems;
    todoItems.push(newTodo);
    this.setState({todoItems, todoName: ''});
  }
  handleDeleteTodo(id) {
    console.log('Delete item with id: ', id);
    let todoItems = this.state.todoItems;
    delete todoItems[id];
    this.setState({todoItems});
  }
  handleCheckTodo(id) {
    let todoItems = this.state.todoItems;
    todoItems[id].done = true;
    this.setState({todoItems});
  }
  handleOnKeyPress(event) {
    if ( event.key === 'Enter' && ! event.shiftKey ) {
      event.preventDefault();
      this.handleAddNewTodo();
    }
  };
  render() {
    return (
      <div className='todo-app'>
        <h2>To do:</h2>
        <div className="todo-list">
          {
            this.state.todoItems.map((item, index) =>
              <TodoItem
                deleteTodo={this.handleDeleteTodo}
                checkTodo={this.handleCheckTodo}
                todoIndex={index}
                key={index} todoItem={item}/>
            )
          }
        </div>
        <hr/>
        <h3 style={{margin: 0}}>New task:</h3>
        <input
          onChange={this.setText}
          onKeyPress={this.handleOnKeyPress}
          value={this.state.todoName}
          type="text"
          placeholder="Enter new task..."/>
        <button
          onClick={this.handleAddNewTodo}
          className="button">Add new to do</button>
      </div>
    );
  }
}