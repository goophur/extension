import React, { Component } from "react";

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const { value } = event.target;
    this.props.onChange(value);
  };

  render() {
    const val = this.props.value;
    return (
      <select value={val} onChange={this.handleChange}>
        <option key={0} name="" value="">Choose a {this.props.name}</option>
        {this.props.options.map((option, index) => {
          return <option key={index + 1} name={option.name} value={option.value}>{option.name}</option>
        })}
      </select>
    );
  }
}

export default SelectInput;
