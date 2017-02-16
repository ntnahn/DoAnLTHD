import React, {Component, PropTypes} from 'react';
import HelloWorld from './HelloWorld';
import NumberIncrease from './NumberIncrease';
import TextInput from './TextInput';
import TodoApp from './TodoApp/TodoApp';

const increaseNumber = 2;
export default class App extends Component {
  render() {
    return (
      <div className='main-app'>
        <HelloWorld name="world"/>
        <NumberIncrease increaseNumber={increaseNumber}/>
        <TextInput/>
        <TodoApp/>
      </div>
    );
  }
}