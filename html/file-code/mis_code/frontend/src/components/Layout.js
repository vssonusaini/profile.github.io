import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../App.css'
const Layout = ({ children }) => {
  const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () =>{
       logout();
        navigate('/login')
    }

    let dashboardLink = null;
    if (auth) {
        if (auth.user.role === 'admin') {
            dashboardLink = '/admin';
        } else if (auth.user.role === 'user') {
            dashboardLink = '/user/orders';
        } else if (auth.user.role === 'packing') {
           dashboardLink = '/packing/orders';
        } else if (auth.user.role === 'dispatch') {
           dashboardLink = '/dispatch/orders'
        }
    }
  return (
    <div className='app-container'>
      <header className='app-header'>
            <nav>
            {auth && dashboardLink && <Link to={dashboardLink}>Dashboard</Link>}
            </nav>
        {auth ?
            <div className='user-info'>
                <span>Logged in as: {auth.user.username}</span>
                <button onClick={handleLogout}>Logout</button>
            </div>
         : null}
      </header>
        <div className="app-content">
           {children}
        </div>
      <footer className='app-footer'>
        <p>© 2024 RAEC Tool</p>
      </footer>
    </div>
  );
};

export default Layout;