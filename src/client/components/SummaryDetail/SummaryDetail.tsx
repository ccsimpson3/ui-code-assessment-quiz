import React from "react";
import "./SummaryDetail.scss";
import { Summary } from "models";
import DefaultButton from "../DefaultButton/DefaultButton";

type State = {};

type Props = {
  summary: Summary;
  onClick: Function;
};

class SummaryDetail extends React.Component<Props, State> {

  render() {
    return (
      <div className="summary-box">
        <div className="summary-title">
          SUMMARY
        </div>
        <div className="summary-content">
          <div className="summary-detail">
            <span className="summary-detail-label">Correct:</span>
            <span className="summary-detail-value">{this.props.summary.correct}</span>
          </div>
          <div className="summary-detail">
            <span className="summary-detail-label">Wrong:</span>
            <span className="summary-detail-value">{this.props.summary.wrong}</span>
          </div>
          <div className="summary-detail">
            <span className="summary-detail-label">Questions Answered:</span>
            <span className="summary-detail-value">{this.props.summary.count}</span>
          </div>
          <div className="summary-detail">
            <span className="summary-detail-label">Final Score:</span>
            <span className="summary-detail-value">{`${this.props.summary.score}%`}</span>
          </div>
        </div>
        <div className="navigation-box">
          <DefaultButton onClick={e => this.props.onClick('restart')}>Restart Quiz</DefaultButton>
        </div>
      </div>
    );
  }
}

export default SummaryDetail;
