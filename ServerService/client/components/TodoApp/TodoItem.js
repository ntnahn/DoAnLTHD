import React, {Component, PropTypes} from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleDeleteItem() {
    this.props.deleteTodo(this.props.todoIndex);
  }
  handleCheck() {
    this.props.checkTodo(this.props.todoIndex);
  }
  render() {
    let todoItem = this.props.todoItem;
    let itemClass = 'todo-item';
    if ( todoItem.done ) {
      itemClass += ' todo-item-done';
    }
    return (
      <div className={itemClass}>
        <span>{todoItem.name}</span>
        <div className="pull-right">
          {
            todoItem.done?'':<button onClick={this.handleCheck} className="button btn-check"/>
          }
          <button onClick={this.handleDeleteItem} className="button btn-delete"/>
        </div>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todoItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired,
  todoIndex: PropTypes.number.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired
};

export default TodoItem;