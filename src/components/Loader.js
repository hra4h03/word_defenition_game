import React from "react";

export const Loader = () => (
  <>
    <div className="question_defenition">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div
      className="question_answers"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50%",
      }}
    >
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </>
);
