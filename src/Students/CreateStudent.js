import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function CreateStudent(){
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const navigate=useNavigate();
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:3001/create',{name,email})
        .then(res =>{
            console.log(res);
            navigate('/student');
        }).catch(err=> console.log(err));
    }
return (
    <div>
        <nav class="navbar bg-body-tertiary">
                <div class="container-fluid justify-content-center align-items-center">
                    <span class="navbar-brand mb-0 h1"><strong>Student Information System</strong></span>
                </div>
            </nav>
        < div className='d-flex vh-100 bg-info justify-content-center align-items-center'>
            < div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                <h2>Add Student</h2>
                <div className='mb-2'>
                    <label htmlFor=''><h4>Name</h4></label>
                    <input type='text' placeholder='Enter Name' className='form-control' 
                    onChange={e=>setName(e.target.value)}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor=''><h4>Email</h4></label>
                    <input type='text' placeholder='Enter Email' className='form-control' 
                     onChange={e=>setEmail(e.target.value)}/>
                </div>
                <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
        </div>
)
}
export default CreateStudent