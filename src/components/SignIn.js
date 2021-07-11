import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userActions";
export function SignIn() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put(
        `https://SocialMedia.amarjitsingh2.repl.co/api/v1/auth`,
        {
          username,
          password
        }
      );
      console.log(res);
      if (res.data.user.username) {
        dispatch(loginUser({ user: res.data.user }));
      } else {
        alert("Can't log you in 😐");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="input"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter Username"
      />
      <input
        className="input"
        type="text"
        password={password}
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <span>
        Don't have an account <Link to="/signup">create account</Link>
      </span>
      <button className="btn" type="submit">
        Login
      </button>
    </form>
  );
}
