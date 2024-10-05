import React, { useState } from 'react';
import styles from '../components/styles/EntryPage.module.css';
import { useNavigate } from 'react-router-dom';
import { loginEmployee, registerEmployee } from '../services/AuthEmployeeService';
import { loginFailure, loginRequest, loginSuccess } from '../slices/authSlice';
import { useDispatch } from 'react-redux';

const EntryPage = () => {
    const [currentView, setCurrentView] = useState('signUp');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState([]); 

    const navigate = useNavigate();
    const dispatch =useDispatch();
    const handleRegister = (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, email, password, roles };
        
        registerEmployee(employee)
            .then(response => {
                console.log(response.data);
                alert('Successfully Registered');
                setCurrentView('logIn');
                navigate('/');
            })
            .catch(error => {
                console.error(error.response.data);
            });
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setRoles('')
            
    };

    
    const handleLogin = (e) => {
        e.preventDefault();
        const loginEmp = { email, password };
        dispatch({type: loginRequest.type, payload: {...loginEmp}});
    
        loginEmployee(loginEmp)
    .then(response => {
        
        const { token } = response.data; 
        const userRole = response.data.employeeDto.roles[0];
        
        console.log('Token:', token, 'User Role:', userRole);
        

        if (token && userRole) {
            // Store the token in localStorage
            // localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(response.data))

            // Dispatch the loginSuccess action with token and userRole
            dispatch(loginSuccess({ token, userRole }));

            // Redirect user based on role
            if (userRole === 'ROLE_ADMIN') {
                navigate('/employees');
                console.log('employees');
                
            } else {
                console.log("normal Employee");
                
                navigate('/employee');
            }
        } else {
            console.error('Missing token or userRole in response');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        dispatch(loginFailure(error.message));
        navigate('/');  
    });
    }

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        const formattedRole = `ROLE_${value.toUpperCase()}`;
        setRoles((prevRoles) =>
            checked ? [...prevRoles, formattedRole] : prevRoles.filter(role => role !== formattedRole)
        );
    };
    const currentViewContent = () => {
        switch (currentView) {
            case 'signUp':
                return (
                    <form className={styles.form} onSubmit={handleRegister}>
                        <h2>Sign Up!</h2>
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>Create Account</legend>
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <label htmlFor="firstname" className={styles.label}>First Name:</label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        className={styles.input}
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </li>
                                <li className={styles.li}>
                                    <label htmlFor="lastname" className={styles.label}>Last Name:</label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        className={styles.input}
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </li>
                                <li className={styles.li}>
                                    <label htmlFor="email" className={styles.label}>Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={styles.input}
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </li>
                                <li className={styles.li}>
                                    <label htmlFor="password" className={styles.label}>Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className={styles.input}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </li>
                                <li className={styles.li}>
                                    <label className={styles.label}>Select Roles:</label>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="EMPLOYEE"
                                                onChange={handleRoleChange}
                                            />
                                            Employee
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="ADMIN"
                                                onChange={handleRoleChange}
                                            />
                                            Admin
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </fieldset>
                        <button className={styles.button} type="submit">Submit</button>
                        <button type="button" className={styles.button} onClick={() => setCurrentView('logIn')}>Have an Account?</button>
                    </form>
                );
            case 'logIn':
                return (
                    <form className={styles.form} onSubmit={handleLogin}>
                        <h2>Welcome Back!</h2>
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>Log In</legend>
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <label htmlFor="username" className={styles.label}>Email:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className={styles.input}
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </li>
                                <li className={styles.li}>
                                    <label htmlFor="password" className={styles.label}>Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className={styles.input}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </li>
                            </ul>
                        </fieldset>
                        <button className={styles.button} type="submit">Login</button>
                        <button type="button" className={styles.button} onClick={() => setCurrentView('signUp')}>Create an Account</button>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <section id="entry-page" className={styles.entryPage}>
            {currentViewContent()}
        </section>
    );
};

export default EntryPage;

