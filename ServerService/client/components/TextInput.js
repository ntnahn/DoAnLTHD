import React, {Component, PropTypes} from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.resetText = this.resetText.bind(this);
    this.getText = this.getText.bind(this);
    this.setText = this.setText.bind(this);
  }
  resetText(event) {
    this.setState({text: ''});
  }
  getText(event) {
    alert('Text: ' + this.state.text);
  }
  setText(event) {
    this.setState({text: event.target.value});
  }
  render() {
    return (
      <div className="text-input">
        <input type="text" value={this.state.text} onChange={this.setText}/>
        <br/>
        <button className="button" onClick={this.resetText}>Reset Text</button>
        <button className="button" onClick={this.getText}>Get Text</button>
      </div>
    );
  }
}

export default TextInput;