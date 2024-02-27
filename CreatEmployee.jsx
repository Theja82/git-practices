import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Employee.css"; // Import CSS file

const CreatEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        id: null,
        name: "",
        lastName: "",
        email: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({
            ...newEmployee,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newEmployee.id) {
            axios
                .put(`http://localhost:8080/emp/${newEmployee.id}`, newEmployee)
                .then((response) => {
                    setEmployees(employees.map((emp) => (emp.id === newEmployee.id ? response.data : emp)));
                    setNewEmployee({
                        id: null,
                        name: "",
                        lastName: "",
                        email: ""
                    });
                    console.log("Employee updated successfully");
                })
                .catch((error) => {
                    console.error("Error updating employee:", error);
                });
        } else {
            axios
                .post("http://localhost:8080/emp", newEmployee)
                .then((response) => {
                    setEmployees([...employees, response.data]);
                    setNewEmployee({
                        id: null,
                        name: "",
                        lastName: "",
                        email: ""
                    });
                    console.log("Employee added successfully");
                })
                .catch((error) => {
                    console.error("Error adding employee:", error);
                });
        }
    };

    const handleEdit = (employee) => {
        setNewEmployee({
            id: employee.id,
            name: employee.name,
            lastName: employee.lastName,
            email: employee.email
        });
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8080/emp/${id}`)
            .then(() => {
                setEmployees(employees.filter((employee) => employee.id !== id));
                console.log("Employee deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
            });
    };

    const fetchEmployees = () => {
        axios
            .get("http://localhost:8080/emp1")
            .then((response) => {
                setEmployees(response.data);
                console.log("Data fetched successfully");
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="employee-container">
            <h1>Employees Registration</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newEmployee.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={newEmployee.lastName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={newEmployee.email}
                        onChange={handleChange}
                    />
                </label>
                <button  className="save-button" type="submit">{newEmployee.id ? "Update" : "Add"} Employee</button>
            </form>
            <h1>Employees list</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <div className="demo">
                                    <button className="edit-button" onClick={() => handleEdit(employee)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(employee.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CreatEmployee;
