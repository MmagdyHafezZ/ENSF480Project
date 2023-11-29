import React from "react";
import "./errorcomponent.scss";
function ErrorComponent() {
  // Add any additional logic here if needed

  return (
    <div className="error-container">
      <h1>Uh Oh</h1>
      <p>There was an error</p>
      <button onClick={() => (window.location.href = "/")}>Go Back Home</button>
    </div>
  );
}

export default ErrorComponent;
