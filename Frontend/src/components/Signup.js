import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Signup.css'; 

function Signup(props) {
    const [cred, setCred] = useState({ name: '', email: '', password: '', role: '' });
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCred({ name: '', email: '', password: '', role: '' });
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password, role: cred.role })
        });
        const json = await response.json();
        if (json.success) {
            history.push('/login');
            props.showAlert("Account created successfully","success");
        }
        else {
            props.showAlert("Sorry a user with this email already exists","danger");
        }
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="design">
            <h1 className="my-3 text-center">Register</h1>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' id="exampleInputName" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Your Name (having minlength is 3) "value={cred.name} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Your Valid Email" value={cred.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={onChange} value={cred.password} placeholder="Enter Your Password (minlength is 5)" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Role</label>
                    <input type="text" className="form-control" name='role' id="exampleInputcPassword1" onChange={onChange} placeholder="Enter your Role (admin,user,superadmin)" value={cred.role} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
