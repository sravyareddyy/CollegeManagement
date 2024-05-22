import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './validation';
import axios from 'axios';

function Forgot() {
    const [values, setValues] = useState({
        username: '',
        newpassword: '',
        repassword: ''
    });

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
        setErrors(Validation(values, false));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values, false));

        if (!errors.username && !errors.newpassword && !errors.repassword && values.newpassword === values.repassword) {
            axios.post('http://localhost:3001/forgot', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        } else {
            setErrorMessage('Enter correct username and password');
        }
    }

    return (
        <div >
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid justify-content-center align-items-center">
                    <span class="navbar-brand mb-0 h1"><strong>Student Information System</strong></span>
                </div>
            </nav>
        <div className="d-flex justify-content-center align-items-center bg-white vh-100">
            <div className="card w-25 border border-primary-subtle">
                <div className="card-body">
                    <h1 className="card-title text-center">Forgot password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="p-2 text-primary-emphasis mt-2">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" placeholder="Enter Username" name='username'
                                value={values.username} onChange={handleInput} className="form-control" />
                            {errors.username && <span className='text-danger'>{errors.username}</span>}
                        </div>
                        <div className="p-2 text-primary-emphasis mt-2">
                            <label htmlFor="password" className="form-label">New Password</label>
                            <input type="password" placeholder="Enter password" name='newpassword'
                                value={values.newpassword} onChange={handleInput} className="form-control" />
                            {errors.newpassword && <span className='text-danger'>{errors.newpassword}</span>}
                        </div>
                        <div className="p-2 text-primary-emphasis mt-2">
                            <label htmlFor="password" className="form-label">Re-enter Password</label>
                            <input type="password" placeholder="Enter password" name='repassword'
                                value={values.repassword} onChange={handleInput} className="form-control" />
                            {errors.repassword && <span className='text-danger'>{errors.repassword}</span>}
                        </div>
                        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                        <div className="d-grid gap-2 p-3">
                            <button type="submit" className="btn btn-success">Change Password</button>
                        </div>
                    </form>

                    <div className="d-flex justify-content-center align-items-center">
                        <Link to="/signup" className="btn btn-outline-secondary me-2">Sign up</Link>
                        <Link to="/" className="btn btn-outline-secondary">Login</Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Forgot;
