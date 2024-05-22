// Login.js
import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import Validation from './validation';
import axios from 'axios';
function Login() {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate=useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
        setErrors(Validation(values, false));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values, false));
        if(!errors.username && !errors.password )
            {
                axios.post('http://localhost:3001/', values)
                .then(res => {
                    navigate('/student');
                })
                .catch(err => console.log(err));
            }
    }

    return (
        <div>
        <nav class="navbar bg-body-tertiary">
                <div class="container-fluid justify-content-center align-items-center">
                    <span class="navbar-brand mb-0 h1"><strong>Student Information System</strong></span>
                </div>
            </nav>
        <div className="d-flex justify-content-center align-items-center bg-white vh-100">
            <div className="card w-25 border border-primary-subtle">
                <div className="card-body">
                    <h1 className="card-title text-center">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="p-2 text-primary-emphasis mt-2">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" placeholder="Enter Username" name='username'
                                value={values.username} onChange={handleInput} className="form-control" />
                            {errors.username && <span className='text-danger'>{errors.username}</span>}
                        </div>
                        <div className="p-2 text-primary-emphasis mt-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" placeholder="Enter password" name='password'
                                value={values.password} onChange={handleInput} className="form-control" />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <div className="d-grid gap-2 p-3">
                            <button type="submit" className="btn btn-success">Log in</button>
                        </div>
                    </form>
                    <div className="d-flex justify-content-center align-items-center">
                        <Link to="/signup" className="btn btn-outline-secondary me-2">Sign up</Link>
                        <Link to="/forgot" className="btn btn-outline-secondary">Forgot Password</Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Login;
