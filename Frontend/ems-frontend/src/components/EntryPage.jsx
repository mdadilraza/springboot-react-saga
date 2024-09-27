import React, { useState } from 'react';
import styles from '../components/styles/EntryPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginEmployee, registerEmployee } from '../services/AuthEmployeeService';

const EntryPage = () => {
    const [currentView, setCurrentView] = useState('signUp');
    const changeView = (view) => setCurrentView(view);
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Access the Redux state
    const { token } = useSelector((state) => state.auth || {});

    const handleRegister = (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, email, password };
        
        registerEmployee(employee).then((response) => {
            console.log(response.data);
            navigate('/'); 
        }).catch(error => {
            console.log(error.response.data);
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const loginEmp = { email, password };
        
        loginEmployee(loginEmp).then(response => {
            console.log(response);
            localStorage.setItem("token", response.data.token);
            navigate('/employees'); 
        }).catch(error => {
            console.error(error);
            navigate('/'); 
        });
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
                            </ul>
                        </fieldset>
                        <button className={styles.button} type="submit">Submit</button>
                        <button type="button" className={styles.button} onClick={() => changeView('logIn')}>Have an Account?</button>
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
                        <button type="button" className={styles.button} onClick={() => changeView('signUp')}>Create an Account</button>
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

// import React, { useState } from 'react';
// import styles from '../components/styles/EntryPage.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginRequest, registerRequest } from '../slices/authSlice';

// const EntryPage = () => {
//     const [currentView, setCurrentView] = useState('signUp');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { token, loading, error } = useSelector(state => state.auth);

//     const handleRegister = (e) => {
//         e.preventDefault();
//         const employee = { firstName, lastName, email, password };
//         dispatch(registerRequest(employee));
//     };

//     const handleLogin = (e) => {
//         e.preventDefault();
//         const loginEmp = { email, password };
//         dispatch(loginRequest(loginEmp));
//     };

//     if (token) {
//         navigate('/employees');
//     }


//     // Function to switch between sign up and log in views
//     const changeView = (view) => setCurrentView(view);

//     const currentViewContent = () => {
//         switch (currentView) {
//             case 'signUp':
//                 return (
//                     <form className={styles.form} onSubmit={handleRegister}>
//                         <h2>Sign Up!</h2>
//                         <fieldset className={styles.fieldset}>
//                             <legend className={styles.legend}>Create Account</legend>
//                             <ul className={styles.ul}>
//                                 <li className={styles.li}>
//                                     <label htmlFor="firstname" className={styles.label}>First Name:</label>
//                                     <input
//                                         type="text"
//                                         id="firstname"
//                                         className={styles.input}
//                                         required
//                                         value={firstName}
//                                         onChange={(e) => setFirstName(e.target.value)}
//                                     />
//                                 </li>
//                                 <li className={styles.li}>
//                                     <label htmlFor="lastname" className={styles.label}>Last Name:</label>
//                                     <input
//                                         type="text"
//                                         id="lastname"
//                                         className={styles.input}
//                                         required
//                                         value={lastName}
//                                         onChange={(e) => setLastName(e.target.value)}
//                                     />
//                                 </li>
//                                 <li className={styles.li}>
//                                     <label htmlFor="email" className={styles.label}>Email:</label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         className={styles.input}
//                                         required
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </li>
//                                 <li className={styles.li}>
//                                     <label htmlFor="password" className={styles.label}>Password:</label>
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         className={styles.input}
//                                         required
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                 </li>
//                             </ul>
//                         </fieldset>
//                         <button className={styles.button} type="submit" disabled={loading}>Submit</button>
//                         <button type="button" className={styles.button} onClick={() => changeView('logIn')}>Have an Account?</button>
//                     </form>
//                 );
//             case 'logIn':
//                 return (
//                     <form className={styles.form} onSubmit={handleLogin}>
//                         <h2>Welcome Back!</h2>
//                         <fieldset className={styles.fieldset}>
//                             <legend className={styles.legend}>Log In</legend>
//                             <ul className={styles.ul}>
//                                 <li className={styles.li}>
//                                     <label htmlFor="username" className={styles.label}>Email:</label>
//                                     <input
//                                         type="text"
//                                         id="username"
//                                         className={styles.input}
//                                         required
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </li>
//                                 <li className={styles.li}>
//                                     <label htmlFor="password" className={styles.label}>Password:</label>
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         className={styles.input}
//                                         required
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                 </li>
//                             </ul>
//                         </fieldset>
//                         <button className={styles.button} type="submit" disabled={loading}>Login</button>
//                         <button type="button" className={styles.button} onClick={() => changeView('signUp')}>Create an Account</button>
//                     </form>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <section id="entry-page" className={styles.entryPage}>
//             {error && <div className="alert alert-danger">{error}</div>}
//             {currentViewContent()}
//         </section>
//     );
// };

// export default EntryPage;

// import React, { useState } from 'react';
// import styles from '../components/styles/EntryPage.module.css';
// import { loginEmployee, registerEmployee } from '../services/AuthEmployeeService';
// import { useNavigate } from 'react-router-dom';


// const EntryPage = () => {
//     const [currentView, setCurrentView] = useState('signUp');
//     const changeView = (view) => setCurrentView(view);
    
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleRegister = (e) => {
//         e.preventDefault();
//         const employee = { firstName, lastName, email, password };
//         console.log(employee);
//         registerEmployee(employee).then((response) => {
//             console.log(response.data);
//             navigate('/'); 
//         }).catch(error => {
//             console.log(error.response.data);
//         });
//     };

//     const handleLogin = (e) => {
//         e.preventDefault();
//         const loginEmp = { email, password };
//         loginEmployee(loginEmp).then(response => {
//             console.log(response);
//             localStorage.setItem("token", response.data.token)
//             navigate('/employees'); 
//         }).catch(error => {
//             console.error(error);
//             navigate('/'); 
//         });
//     };

//     const currentViewContent = () => {
//         switch (currentView) {
//             case 'signUp':
//                 return (
//                     <form className={styles.form} onSubmit={handleRegister}>
//                         <h2>Sign Up!</h2>
//                         <fieldset className={styles.fieldset}>
//                             <legend className={styles.legend}>Create Account</legend>
//                             <ul className={styles.ul}>
//                                 <li className={styles.li}>
//                                     <label htmlFor="firstname" className={styles.label}>First Name:</label>
//                                     <input
//                                         type="text"
//                                         id="firstname"
//                                         className={styles.input}
//                                         required
//                                         value={firstName}
//                                         onChange={(e) => setFirstName(e.target.value)} // Bind firstName state
//                                     />
//                                 </li>
//                                 <li className={styles.li}>
//                                     <label htmlFor="lastname" className={styles.label}>Last Name:</label>
//                                     <input
//                                         type="text"
//                                         id="lastname"
//                                         className={styles.input}
//                                         required
//                                         value={lastName}
//                                         onChange={(e) => setLastName(e.target.value)} // Bind lastName state
//                                     />
//                                 </li>
//                                 <li className={styles.li}>
//                                     <label htmlFor="email" className={styles.label}>Email:</label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         className={styles.input}
//                                         required
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)} // Bind email state
//                                     />
//                                 </li>
//                                 <li className={styles.li}>
//                                     <label htmlFor="password" className={styles.label}>Password:</label>
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         className={styles.input}
//                                         required
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)} // Bind password state
//                                     />
//                                 </li>
//                             </ul>
//                         </fieldset>
//                         <button className={styles.button} type="submit">Submit</button>
//                         <button type="button" className={styles.button} onClick={() => changeView('logIn')}>Have an Account?</button>
//                     </form>
//                 );
//             case 'logIn':
//                 return (
//                     <form className={styles.form} onSubmit={handleLogin}>
//                         <h2>Welcome Back!</h2>
//                         <fieldset className={styles.fieldset}>
//                             <legend className={styles.legend}>Log In</legend>
//                             <ul className={styles.ul}>
//                                 <li className={styles.li}>
//                                     <label htmlFor="username" className={styles.label}>Email:</label>
//                                     <input
//                                         type="text"
//                                         id="username"
//                                         className={styles.input}
//                                         required
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)} // Bind email state
//                                     />
//                                 </li>
//                                 <li className={styles.li}>
//                                     <label htmlFor="password" className={styles.label}>Password:</label>
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         className={styles.input}
//                                         required
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)} // Bind password state
//                                     />
//                                 </li>
                                
//                             </ul>
//                         </fieldset>
//                         <button className={styles.button} type="submit">Login</button>
//                         <button type="button" className={styles.button} onClick={() => changeView('signUp')}>Create an Account</button>
//                     </form>
//                 );
            
//             default:
//                 break;
//         }
//     };

//     return (
//         <section id="entry-page" className={styles.entryPage}>
//             {currentViewContent()}
//         </section>
//     );
// };

// export default EntryPage;
