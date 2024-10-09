import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin'); // Default to admin
  const navigate = useNavigate(); // For redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Send login data with account type
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
        userType, // Include account type in the login request
      });

      localStorage.setItem('token', res.data.token); // Store JWT token
      navigate('/home'); // Redirect to home page
    } catch (err) {
      alert('Login failed: ' + err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>

          {/* Account Type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Account Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
