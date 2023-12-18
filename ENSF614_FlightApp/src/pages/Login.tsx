/*
 *  File Name: Login.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a page allows the user to login or continue as guest
 * (if they continue as guest a account info page allows them to create an account)
 * When a registered user logs in using a username and password an API call is made
 * to check the credencials. if the credencials match the user info is written to local
 * storage (for use by the user context)
 * If the credencials are incorrect the user will not be allowed to leave the page
 * (until they enter the correct information)
 */

import { useEffect, useState, useContext } from "react";
import "../styles.css";
import { User } from "../types.ts";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig.ts";
import { UserContext } from "../contexts/UserContext.tsx";

function Login() {
  const [role, setRole] = useState(0);
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const userContext = useContext(UserContext);
  console.log("user:", userContext.userid);

  useEffect(() => {
    if (role == 0 || role == undefined) {
      history("/");
    } else {
      history("/Home");
    }
  }, [role]);

  const handleGuest = () => {
    const user = {
      userid: "guest",
      userpassword: "guest",
      userrole: 1,
      legalname: "Guest",
      DOB: "",
      email: "none",
      phonenumber: "None",
    } as User;
    userContext.userid = user.userid;
    userContext.userpassword = user.userpassword;
    userContext.userrole = user.userrole;
    userContext.legalname = user.legalname;
    userContext.DOB = user.DOB;
    userContext.email = user.email;
    userContext.phonenumber = user.phonenumber;
    localStorage.setItem("user", JSON.stringify(user));
    setRole(1);
  };

  const handleUser = async () => {
    try {
      await api.get(`/api/v1/user/${userid}/${password}`).then((response) => {
        const userData = response.data;
        userContext.userid = userData.userid;
        userContext.userpassword = userData.userpassword;
        userContext.userrole = userData.userrole;
        userContext.legalname = userData.legalname;
        userContext.DOB = userData.dob;
        userContext.email = userData.email;
        userContext.phonenumber = userData.phonenumber;
        localStorage.setItem("user", JSON.stringify(userContext));
        setRole(userData.userrole);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <form className="form-control form-control-lg">
        <div className="form-group">
          <label>User ID</label>
          <input
            type="text"
            className="form-control"
            id=""
            aria-describedby="emailHelp"
            placeholder="Enter UserID"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleGuest}
        >
          Continue as Guest
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleUser}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
