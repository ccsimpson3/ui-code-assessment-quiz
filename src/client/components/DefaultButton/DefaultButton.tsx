import React, { Component } from "react";
import "./DefaultButton.scss";

type State = {};
type Props = {
  text?: string;
  disable?: boolean;
  className?: string;
  onClick: Function;
};

export class DefaultButton extends Component<Props, State> {
  render() {
    const {
      text,
      disable,
      className,
      onClick,
      children = "Click"
    } = this.props;
    const value = text || children;
    return (
      <button
        className={disable ? `disable ${className} button-base` : `${className} button-base`}
        onClick={e => onClick(e)}
      >
        {value}
      </button>
    );
  }
}

export default DefaultButton;
