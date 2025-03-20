import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';
import api from "./api.jsx";

const SignUp = () => {

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      window.location.href = "/";
    }
  } , [token]);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.signup(formData);
      navigate("/login");
      window.location.reload(); // Reloading window after login (may not be necessary in some cases)
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.'); // Set error message if login fails
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name={"email"}
            defaultValue={formData.email}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name={"username"}
            defaultValue={formData.username}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name={"password"}
            defaultValue={formData.password}
            onChange={handleChange}
            required={true}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
