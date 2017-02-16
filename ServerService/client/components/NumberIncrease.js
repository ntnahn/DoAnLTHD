import React, {Component, PropTypes} from 'react';

class NumberIncrease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberValue: 0
    };
    this.increase = this.increase.bind(this);
  }
  increase(event) {
    console.log('NumberIncrease, event target');
    console.log(event.target);
    this.setState((prevState, props) => ({
      numberValue: prevState.numberValue+this.props.increaseNumber
    }));
  }
  componentWillMount() {
    console.log('componentWillMount');
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  componentWillUnMount() {
    console.log('componentWillUnMount');
  }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }
  render() {
    return (
      <div className="number-increase">
        <span>Number value: {this.state.numberValue}</span>
        <br/>
        <button className="button" style={{marginRight: 10}} onClick={this.increase}>Increase</button>
      </div>
    );
  }
}

NumberIncrease.propTypes = {
  increaseNumber: PropTypes.number.isRequired
};

export default NumberIncrease;