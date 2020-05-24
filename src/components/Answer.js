import React, { useState, useEffect } from "react";

export const Answer = ({ word, isRight, clickHandler }) => {
  const [classes, setClasses] = useState(["question_answer"]);
  // console.log(isRight, word);
  const addClass = (classToAdd) => {
    setClasses((c) => [...c, classToAdd]);
  };
  useEffect(() => {
    setClasses(["question_answer"]);
  }, [word]);
  return (
    <div
      className={classes.join(" ")}
      onClick={() => clickHandler(isRight, addClass)}
    >
      {word ? (
        <>
          <div>&#x26F6;</div>
          <span>{word}</span>
        </>
      ) : (
        "..."
      )}
    </div>
  );
};
