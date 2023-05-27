import React from "react";
import OneQuestion from "./onquestion";
import questions from "./questionsharu";

const Questions = () => {
  const myQuestions = questions.map((item) => (
    <OneQuestion key={item.id} id={item.id} que={item.que} img={item.img} />
  ));

  return (
    <>
      <div className="p-5">
        <div className="d-flex justify-content-center">
          <h4>My Scheduled Test</h4>
        </div>
        <div className="row">{myQuestions}</div>
      </div>
    </>
  );
};

export default Questions;
