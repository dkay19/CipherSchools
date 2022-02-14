import "./Form.css";
import React, { useState, useContext } from "react";
import LogContext from "./../../context/context";

let database = [
  {
    username: "user1",
    email: "user1@gmail.com",
    password: "pass1",
  },
  {
    username: "user2",
    email: "user1@gmail.com",
    password: "pass2",
  },
];
const Form = ({ children }) => {
  const [Onlogin, setlog] = useState(true);

  let { issubmi, setsubmit } = useContext(LogContext);
  let issubmit = issubmi;
  const [errormssg, setError] = useState({});
  let handleForm = (e) => {
    setError({});
    e.preventDefault();
    let { uname, pass, email } = document.forms[0];

    // Find user login info
    if (Onlogin) {
      const userData = database.find((user) => user.username === uname.value);

      // Compare user info
      if (userData) {
        if (userData.password !== pass.value) {
          // Invalid password
          setError({ key: "pass", message: "password incorrect" });
        } else {
          setsubmit(true);
        }
      } else {
        // Username not found
        setError({ key: "uname", message: "userName Not found" });
      }
    } else {
      database = [
        ...database,
        {
          username: uname.value,
          email: email.value,
          password: pass.value,
        },
      ];
      setlog(true);
      setError({});
    }
  };
  let renderErrorMessage = (key) => {
    if (key === errormssg.key)
      return <div className="error">{errormssg.message}</div>;
  };

  return (
    <>
      <div className="form">
        {!issubmit && (
          <form onSubmit={handleForm}>
            <div className="input-container">
              <label>Username </label>
              <input type="text" name="uname" placeholder="user1" required />
              {renderErrorMessage("uname")}
            </div>
            {!Onlogin && (
              <div className="input-container">
                <label>Email </label>
                <input type="Email" name="email" required />
                {renderErrorMessage("email")}
              </div>
            )}
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" placeholder="pass1" required />
              {renderErrorMessage("pass")}
            </div>

            <div className="button-container">
              <button>{Onlogin ? "Login" : "Register"}</button>
              <span
                className="sM"
                onClick={() => {
                  setlog((prev) => !prev);
                  setError({});
                }}
              >
                {Onlogin ? "Register Here" : "Login Here"}
              </span>
            </div>
          </form>
        )}
        {issubmit && children}
      </div>
    </>
  );
};
export default Form;
