import React, {Component, PropTypes} from 'react';

class HelloWorld extends Component {
  render() {
    return (
      <span className="hello-world">Hello {this.props.name}</span>
    );
  }
}
HelloWorld.propTypes = {
  name: PropTypes.string.isRequired
};

export default HelloWorld;