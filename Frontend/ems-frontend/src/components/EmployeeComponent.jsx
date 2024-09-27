import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateEmployee } from '../services/EmployeeService';
import { addEmployee, editEmployee, fetchEmployees } from '../slices/employeeSlice';
// import { fetchEmployee, addEmployee, updateEmployee } from '../saga/sagas';

const EmployeeComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const employee = useSelector((state) => state.employee.employee);
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchEmployees(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (employee) {
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setEmail(employee.email);
            setPassword(employee.password);
        }
    }, [employee]);
    // useEffect(() => {
    //     if (id) {
    //         dispatch(fetchEmployee(id)).then((response) => {
    //             console.log(response);
                
    //             setFirstName(response.data.firstName);
    //             setLastName(response.data.lastName);
    //             setEmail(response.data.email);
    //             setPassword(response.data.password)
    //         }).catch(error => {
    //             console.log(error);
    //         })
    //     }
    // }, [id])

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        const newEmployee = { firstName, lastName, email, password };
        if (validateForm()) {
            if (id) {
                // dispatch(updateEmployee({ id, employee: newEmployee }));
                dispatch(editEmployee({ id, employee: newEmployee }));
            } else {
                dispatch(addEmployee(newEmployee));
            }
            navigate('/employees');
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorCopy = { firstName: '', lastName: '', email: '', password: '' };

        if (!firstName.trim()) {
            errorCopy.firstName = 'First Name is required';
            valid = false;
        }
        if (!lastName.trim()) {
            errorCopy.lastName = 'Last Name is required';
            valid = false;
        }
        if (!email.trim()) {
            errorCopy.email = 'Email is required';
            valid = false;
        }
        if (!password.trim()) {
            errorCopy.password = 'Password is required';
            valid = false;
        }

        setErrors(errorCopy);
        return valid;
    };

    const pageTitle = () => {
        return id ? <h2 className="text-center">Update Employee</h2> : <h2 className="text-center">Add Employee</h2>;
    };

    return (
        <div className='container'>
            <br /><br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {pageTitle()}
                    <div className="card-body">
                        <form onSubmit={saveOrUpdateEmployee}>
                            <div className="form-group mb-2">
                                <label htmlFor="first-Name" className="form-label">First Name:</label>
                                <input type="text" name="firstName"
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder='ENTER EMPLOYEE FIRST NAME'
                                    id='first-Name' />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="last-Name" className="form-label">Last Name:</label>
                                <input type="text" name="lastName"
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder='ENTER EMPLOYEE LAST NAME'
                                    id='last-Name' />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="emails" className="form-label">Email:</label>
                                <input type="email" name="email"
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='ENTER EMPLOYEE EMAIL'
                                    id='emails' />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" name="password"
                                    value={password}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='ENTER EMPLOYEE PASSWORD'
                                    id='password' />
                                {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                            </div>
                            
                            <button className='btn btn-success' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
