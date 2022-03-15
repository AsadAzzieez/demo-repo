import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";


const LOGIN_URL = "/auth/local";
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    console.log(JSON.stringify({ identifier: user, password: pwd }));
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ identifier: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data.jwt));
      setAccessToken(response?.data.jwt);
      const accessToken = response?.data.jwt;
      const role = response?.data.user.role;
      console.log(role);
      setAuth({user,pwd,role,accessToken})
      setPwd("");
      setUser("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <br />
          <Dashboard accessToken={accessToken}/>
        
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form className='add-form' onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              required
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              ref={userRef}
              value={user}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
