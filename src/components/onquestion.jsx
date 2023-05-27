import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const onquestion = (props) => {
  return (
    <div className="col-4 mb-4">
      <div className="card">
        <button className="dismiss" type="button">
          x
        </button>
        <div className="header">
          <div className="image">{props.id}</div>
          <div className="content">
            <span className="title">{props.type}</span>
            <p className="message">{props.que}</p>
            <p className="message">
              <img src={props.img} alt="Hello" className="meroImg" />
            </p>
          </div>
          <div className="actions">
            <button className="history" type="button">
              Skip For Now
            </button>
            <button className="track" type="button">
              <Link to={`/answer/${props.id}`} className="text-decoration-none" >
                Answer this question
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default onquestion;
