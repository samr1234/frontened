import React from "react";
import "./Login.css";
import {useState} from 'react'
import axios from 'axios'
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login =async(e)=>{

    e.preventDefault();
    const userInfo = await axios.post("/login",{
      email,
      password,
    })

  }



  const cardStyle = {
    borderRadius: "1rem",
  };

  const imgStyle = {
    borderRadius: "1rem 0 0 1rem",
  };

  const textStyle = {
    letterSpacing: "2px",
    textAlign: "center",
    height: "20px",
  };

  const linkStyle = {
    color: "#393f81",
  };

  return (
    <div>
      <section className="vh-90">
        <div className="container py-5 h-90">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={cardStyle}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block ">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid "
                      style={imgStyle}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-5 p-lg-6 ">
                      <form onSubmit={Login}>
                        
                        <div className="flex flex-col justify-center items-center gap-3">
                          <i
                            className="fas fa-cubes fa-2x me-11"
                            style={{ paddingLeft: "90px" }}
                          ></i>
                          <span className="mx-auto">
                            <img
                              src="https://hopingminds.com/wp-content/uploads/2023/01/Asset-5.png"
                              alt=""
                              style={{ width: "150px", height: "auto" }}
                            />
                          </span>
                          <h5 className=" mb-3 pb-3 mx-auto" style={textStyle}>
                          Login To Continue
                        </h5>
                        </div>
                       
                        <div className="form-outline mb-4 ">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control"
                            value={email} 
                            onChange={e=>setEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control "
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                          />
                        </div>
                        <div className="pt-1 mb-2">
                          <button
                            className="btn1 btn-success"
                            style={{ alignItem: "center" }}
                          >
                            Login
                          </button>
                        </div>
                        <a
                          className="fw-bold"
                          href="#!"
                          style={{ fontFamily: "-moz-initial", float: "right" }}
                        >
                          Forgot password?
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
