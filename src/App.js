// ParentComponent.js
import React, { useState } from "react";
import Login from "./Components/Login";
import Form from "./Components/form";

const App = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const switchForm = (event) => {
    // Toggle between login and signup forms
    event.preventDefault();
    setIsLoginForm((prevIsLoginForm) => !prevIsLoginForm);
  };

  return (
    <div>
      {isLoginForm ? (
        <Login switchForm={switchForm} />
      ) : (
        <Form switchForm={switchForm} />
      )}
    </div>
  );
};

export default App;
