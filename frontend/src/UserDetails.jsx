import { useState, useEffect } from 'react';
import api from './api'; // Import the API call

const UserDetails = () => {

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, [token]);

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          },
        };
        const response = await api.getUserDetails(config);
        setUserDetails(response.data);
      }
    };
    fetchUserDetails();
  }, [token]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="auth-container">
      <h2>User Details</h2>
      <p>Username: {userDetails.username}</p>
      <p>Email: {userDetails.email}</p>
      <button onClick={() => window.location.href = "/"}>Back</button>
    </div>
  );
};

export default UserDetails;
