import React from "react";
import "./TextBox.scss";

type State = {
  enteredValue: string;
};

type Props = {
  name: string;
  onChange: Function;
};

class TextBox extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      enteredValue: ''
    };
  }

  handleOnChange(e) {
    this.setState({ enteredValue: e.target.value });
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className="textBox">
        <input key={this.props.name} type="text" name={this.props.name} onChange={(e) => this.handleOnChange(e)}></input>
      </div>
    );
  }
}

export default TextBox;
