import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, editEmployee, fetchEmployeeById } from '../slices/employeeSlice';

const EmployeeComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const employee = useSelector((state) => state.employee.employee);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [roles, setRoles] = useState([]);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchEmployeeById(id)).then((response) => {
                if (response.payload) {
                    setFirstName(response.payload.firstName || '');
                    setLastName(response.payload.lastName || '');
                    setEmail(response.payload.email || '');
                    setRoles(response.payload.roles || []);
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id, dispatch]);

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        
        const newEmployee = { 
            firstName, 
            lastName, 
            email, 
            roles 
        };
        
        if (!id) {
            // Only add password if we are creating a new employee
            newEmployee.password = password;
        }

        if (validateForm()) {
            if (id) {
                dispatch(editEmployee({ id, employee: newEmployee }));
                navigate('/employees');
            } else {
                dispatch(addEmployee(newEmployee));
                navigate('/employees');
            }
            
        }
    };

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        const formattedRole = `ROLE_${value.toUpperCase()}`;
        setRoles((prevRoles) =>
            checked ? [...prevRoles, formattedRole] : prevRoles.filter(role => role !== formattedRole)
        );
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
        if (!id && !password.trim()) { // Only validate password when adding a new employee
            errorCopy.password = 'Password is required';
            valid = false;
        }

        setErrors(errorCopy);
        return valid;
    };

    // Getting userRole from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    let currentUserRole;

    if (user) {
        currentUserRole = user.employeeDto.roles.join(", ");
        console.log(currentUserRole);
    }

    const pageTitle = () => {
        return id ? <h2 className="text-center">Update Employee</h2> : <h2 className="text-center">Add Employee</h2>;
    };

    return (
        <div className='container'>
            <br /><br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    { pageTitle() }
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
                            
                            {/* Password input - only show if adding new employee */}
                            {!id && (
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
                            )}

                            {/* Roles Selection (Admin Only) */}
                            {currentUserRole === 'ROLE_ADMIN' && (
                                <div className="form-group mb-2"> 
                                    <label className="form-label">Roles:</label>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value="EMPLOYEE"
                                            onChange={handleRoleChange}
                                            checked={roles.includes('ROLE_EMPLOYEE')}
                                        />
                                        <label className="form-check-label">Employee</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value="ADMIN"
                                            onChange={handleRoleChange}
                                            checked={roles.includes('ROLE_ADMIN')}
                                        />
                                        <label className="form-check-label">Admin</label>
                                    </div>
                                </div>
                            )}

                            <button className='btn btn-success' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
