import React from "react";

const Home = () => {
  return (
    <div className="container my-3">
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
