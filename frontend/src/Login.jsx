import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from "./api.jsx";

const Login = () => {

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      window.location.href = "/";
    }
  } , [token]);

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login(formData);
      navigate("/");
      localStorage.setItem('token', response.data.token); // Store the token in local storage
      window.location.reload(); // Reloading window after login (may not be necessary in some cases)
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.'); // Set error message if login fails
    }
  };

  return (
    <div className="auth-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name={"username"}
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name={"password"}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>
        {"Don't have an account?"} <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
