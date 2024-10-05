import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editEmployee } from '../slices/employeeSlice';
import { useNavigate } from 'react-router-dom';

function EmployeeProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for managing profile
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [roles, setRoles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [user, setUser] = useState(null);  

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser);
    if (storedUser && storedUser.employeeDto) {
      setUser(storedUser);  
      setName(`${storedUser.employeeDto.firstName} ${storedUser.employeeDto.lastName}`);
      setEmail(storedUser.employeeDto.email);
      setId(storedUser.employeeDto.id);
      setFirstName(storedUser.employeeDto.firstName);
      setLastName(storedUser.employeeDto.lastName);
      setRoles([...storedUser.employeeDto.roles]);
      setCurrentEmployee({ ...storedUser.employeeDto });
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedEmployee = { firstName, lastName, email, roles };

    // Dispatch the update action
    const result = await dispatch(editEmployee({ id, employee: updatedEmployee }));
    if (result && result.payload) {
      const updatedUser = { ...user };  
      updatedUser.employeeDto.firstName = firstName;
      updatedUser.employeeDto.lastName = lastName;
      updatedUser.employeeDto.email = email;
      updatedUser.employeeDto.roles = roles;

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Update local state to trigger re-render
      setCurrentEmployee(updatedUser.employeeDto);
      setName(`${updatedUser.employeeDto.firstName} ${updatedUser.employeeDto.lastName}`);

      setIsEditing(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      {!user?.employeeDto ? (
        <h1 className='container mt-5 text-center text-danger'>Please Login</h1>
      ) : (
        <div style={styles.container}>
          <h2>Employee Profile</h2>

          {isEditing ? (
            <form style={styles.form} onSubmit={handleSave}>
              <div style={styles.formGroup}>
                <label>First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  readOnly
                />
              </div>

              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.button}>
                  Save
                </button>
                <button type="button" style={styles.button} onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div style={styles.info}>
                <strong>Name:</strong> {name || 'No name found'}
              </div>
              <div style={styles.info}>
                <strong>Email:</strong> {email || 'No email found'}
              </div>

              <div style={styles.buttonGroup}>
                <button style={styles.button} onClick={handleEditClick}>
                  Edit Profile
                </button>
                <button style={styles.button} onClick={logout}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

// Some basic styling
const styles = {
  container: {
    width: '300px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f4f4f4',
  },
  info: {
    marginBottom: '15px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
  },
};

export default EmployeeProfile;
