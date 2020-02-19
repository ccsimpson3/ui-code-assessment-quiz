import React from "react";
import "./RadioGroup.scss";

type State = {
  selectedOption: string;
};

type Props = {
  name: string;
  options: string[];
  onClick: Function;
  onChange: Function;
};

const RadioGroupOption = ({ name, options, selected, onChange }) => {
  return (
    options.map((option, index) => (
      <div className="radio" key={`radio-option-box-${name}-${index}`} id={`radio-option-box-${name}-${index}`}>
        <input type="radio" name={name} id={`radio-option-${name}-${index}`} value={option} checked={selected === option} onChange={onChange} />
        <label htmlFor={`radio-option-${name}-${index}`} className="radio-label">{option}</label>
      </div>
    ))
  );
};

class RadioGroup extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ''
    };
  }

  handleOnChange(e) {
    this.setState({ selectedOption: e.target.value });
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <div className="radio-group">
        <RadioGroupOption
          name={this.props.name}
          options={this.props.options}
          onChange={(e) => this.handleOnChange(e)}
          selected={this.state.selectedOption} />
      </div>
    );
  }
}

export default RadioGroup;
