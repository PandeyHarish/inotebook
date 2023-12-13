import React from "react";

import Note from "./Note";


const Home = () => {
  return (
    <>
      <div className="container my-3">
        <h2>Add note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <Note/>
    </>
  );
};

export default Home;
