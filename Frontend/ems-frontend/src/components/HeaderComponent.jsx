import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/'); 
  };

  const isUserAdmin = user?.employeeDto?.roles?.includes('ROLE_ADMIN');
  const showProfileAndLogout = location.pathname === '/employees' && user?.employeeDto?.roles;

  return (
    <header style={styles.header}>
      <nav className="navbar navbar-dark bg-dark" style={styles.navbar}>
        <a className="navbar-brand" href="#">Employee Management System</a>

        <div className="ml-auto d-flex align-items-center">
          <ul className="navbar-nav d-flex flex-row align-items-center" style={styles.navList}>
            {user?.employeeDto?.roles[0] === 'ROLE_ADMIN' &&
            <li className="nav-item">
              <Link className="nav-link" style={styles.navLink} to="/employees">Home</Link>
            </li>
            } 
            {showProfileAndLogout && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" style={styles.navLink} to="/employee">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" style={styles.logoutBtn} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

// CSS styles for the HeaderComponent
const styles = {
  header: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 3,
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  },
  navList: {
    display: 'flex', 
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 15px',
    marginRight: '10px',
  },
  logoutBtn: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 15px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
};

export default HeaderComponent;
