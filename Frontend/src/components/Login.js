import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Signup.css'; 


function Login(props) {
    const [cred, setCred] = useState({ email: '', password: '' });
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCred({ email: '', password: '' });

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.setIsLogin(true);
            // Finding role
            const response2 = await fetch('http://localhost:5000/api/auth/getrole', {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
            });
            const role = await response2.text();
            if(role === "user") history.push('/user');
            else if(role === "admin") history.push('/admin');
            else if (role === "superadmin") history.push('/superadmin');
        }

        else {
            alert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div className='design'>
            <h1 className="my-3 text-center">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp" value={cred.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={onChange} value={cred.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
