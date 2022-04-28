import React from "react";
import sleepy from "../../../images/notFound.jpg";

const NotFound = () => {
  return (
    <div>
      <h1 className="text-primary text-center">Mechanic is Sleeping</h1>
      <img className="w-100" src={sleepy} alt="" />
    </div>
  );
};

export default NotFound;
