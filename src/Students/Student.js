import React,{useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'; 
import axios from 'axios'
import { Link } from 'react-router-dom'
function Student() {
    const [student, setStudent] = useState([]);
    const [records, setRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [skillsFilter, setSkillsFilter] = useState('');
    const [qualificationFilter, setQualificationFilter] = useState('');
    useEffect(() => {
        axios.get('http://localhost:3001/student')
            .then(res => {
                setStudent(res.data);
                setRecords(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    const Filter = () => {
        let filteredRecords = [...student];
        if (genderFilter) {
            console.log("Filtering by gender:", genderFilter);
            filteredRecords = filteredRecords.filter(record => record.gender === genderFilter);
            console.log("Filtered by gender:", filteredRecords);
        }
        if (skillsFilter) {
            console.log("Filtering by skills:", skillsFilter);
            filteredRecords = filteredRecords.filter(record => record.skills.includes(skillsFilter));
            console.log("Filtered by skills:", filteredRecords);
        }
        if (qualificationFilter) {
            console.log("Filtering by qualification:", qualificationFilter);
            filteredRecords = filteredRecords.filter(record => record.qualification === qualificationFilter);
            console.log("Filtered by qualification:", filteredRecords);
        }
        setRecords(filteredRecords);
    };
    const filteredRecords = records.filter((data) =>
        data.studname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    useEffect(() => {
        Filter();
    }, [genderFilter, skillsFilter, qualificationFilter]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
        return formattedDate;
    }
  return (
    <div>
        <nav class="navbar bg-body-tertiary">
        <div class="container-fluid justify-content-center align-items-center">
            <span class="navbar-brand mb-0 h1"><strong>Student Information System</strong></span>
        </div>
        </nav>
    
    <div className='d-flex vh-100 bg-info justify-content-center align-items-center'>
        <div className='w-90 bg-white rounded p-3'>
        <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/>
                <Button variant="success" className='search_btn'>Search</Button>
              </Form>
            </div>
            <Link to="/create" className='btn btn-success'>ADD</Link>
          </div>
          <div className="filter-section d-flex mt-3 mb-3 justify-content-between align-items-center">
    <div className="filter-item">
        <span className="me-2">Gender:</span>
        <label className="me-3">
            <input type="radio" name="gender" value="male" onChange={(e) => setGenderFilter(e.target.value)} />
            Male
        </label>
        <label className='me-3'>
            <input type="radio" name="gender" value="female" onChange={(e) => setGenderFilter(e.target.value)} />
            Female
        </label>
        <label>
            <input type="radio" name="gender" value="" onChange={(e) => setGenderFilter(e.target.value)} />
            Everyone
        </label>
    </div>
    <div className="filter-item">
        <span className="me-2">Skills:</span>
        <select onChange={(e) => setSkillsFilter(e.target.value)}>
            <option value="">Select Skills</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="python">Python</option>
        </select>
    </div>
    <div className="filter-item">
        <span className="me-2">Qualification:</span>
        <select onChange={(e) => setQualificationFilter(e.target.value)}>
            <option value="">Select Qualification</option>
            <option value="btech">B.Tech</option>
            <option value="BE">B.E</option>
        </select>
    </div>
</div>
            <table className='table'>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Qualification</th>
                    <th>Dob</th>
                    <th>Skills</th>
                    <th>Email</th>
                    <th>Phone</th>
                    {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredRecords.map((data,i)=>(
                            <tr key={i}>
                                <td>{data.studid}</td>
                                <td>{data.studname}</td>
                                <td>{data.address}</td>
                                <td>{data.gender}</td>
                                <td>{data.qualification}</td>
                                <td>{formatDate(data.dob)}</td>
                                <td>{data.skills}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                {/* <td>
                                    <button className='btn btn-primary'>Update</button>
                                    <button className='btn btn-danger ms-2'>Delete</button>
                                </td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
    </div>
  )
}

export default Student