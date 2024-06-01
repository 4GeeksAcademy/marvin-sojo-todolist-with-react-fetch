import React from "react";

const Title = ({ title }) => {
  return (
    <div className="text-center mt-4">
      <p className="task-title display-1">{title}</p>
    </div>
  );
};

export default Title;
