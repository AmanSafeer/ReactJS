import React from 'react';
import './input.css'

class Input extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" className="form-user">{this.props.label}</label>
        <input
        value={this.props.value}
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={this.props.inputHandler}
        />
      </div>
    );
  }
}

export default Input;
