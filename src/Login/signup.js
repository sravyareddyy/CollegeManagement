import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './validation';
import axios from 'axios';
function Signup() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        emailid: '',
        phoneno: '',
        isactive: true, 
        salary: 0,      
        roleid: 1      
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        const newErrors = Validation(values, true);
        setErrors(newErrors);
    }, [values]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!errors.username && !errors.emailid && !errors.password && !errors.phoneno) {
            axios.post('http://localhost:3001/signup', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        } else {
            console.log('Errors found:', errors);
        }
    }
    

    
    return (
        <div>
        <nav class="navbar bg-body-tertiary">
        <div class="container-fluid justify-content-center align-items-center">
            <span class="navbar-brand mb-0 h1"><strong>Student Information System</strong></span>
        </div>
    </nav>
        <div className="d-flex justify-content-center align-items-center bg-white mt-2 vh-100">
            <div className="card w-25 border border-primary-subtle">
                <div className="card-body">
                    <h1 className="card-title text-center">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="p-2 text-primary-emphasis mt-2">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" name="username" className="form-control" placeholder="Enter username"
                                value={values.username} onChange={handleInput} />
                            {errors.username && <span className='text-danger'>{errors.username}</span>}
                        </div>
                        <div className="p-2 text-primary-emphasis mt-2">
                            <label htmlFor="emailid" className="form-label">Email</label>
                            <input type="email" name="emailid" className="form-control" placeholder="Enter email"
                                value={values.emailid} onChange={handleInput} />
                            {errors.emailid && <span className='text-danger'>{errors.emailid}</span>}
                        </div>
                        <div className="p-2 text-primary-emphasis mt-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" placeholder="Enter password"
                                value={values.password} onChange={handleInput} />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <div className="p-2 text-primary-emphasis mt-2">
                            <label htmlFor="phoneno" className="form-label">Phone Number</label>
                            <input type="text" name="phoneno" className="form-control" placeholder="Enter phone number"
                                value={values.phoneno} onChange={handleInput} />
                            {errors.phoneno && <span className='text-danger'>{errors.phoneno}</span>}
                        </div>
                        <div className="d-grid gap-2 p-3">
                            <button type="submit" className="btn btn-success">Sign up</button>
                        </div>
                    </form>
                    <div className="d-flex justify-content-center align-items-center">
                        <Link to="/" className="btn btn-outline-secondary me-2">Login</Link>
                        <Link to="/forgot" className="btn btn-outline-secondary">Forgot Password</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Signup;
