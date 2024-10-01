import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, removeEmployee } from '../slices/employeeSlice';

const ListOfEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { employees, loading, error } = useSelector((state) => state.employee);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(removeEmployee(id));
    };
    const updateEmployee = (id) => {
        navigate(`/edit-employee/${id}`);
    }

    const addNewEmployee = () => {
        navigate('/add-employee')
    }



   (employees.map(e =>console.log(e)
   ))

    return (
        <div className='container' style={{ margin: '90px' }}>
            <h2 className='text-center'>List Of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee} >Add Employee</button>
            {loading && <p>Loading...</p>}
            {error && <p className='text-danger'>{error}</p>}
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(employee.id)} style={{ marginLeft: '10px' }}>Delete</button>
                            </td>
                        </tr>


                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOfEmployee;
