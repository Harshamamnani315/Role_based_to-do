import React, { useEffect, useContext } from 'react';
import context from '../context/todos/context';
import Usercard from './cards/Usercard';
import { useHistory } from 'react-router-dom';

function Admin(props) {
    const history = useHistory();
    const context1 = useContext(context);
    const { fetchallUsers, users } = context1;

    const findRole = async () => {
        const response2 = await fetch('http://localhost:5000/api/auth/getrole', {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
        });
        const role = await response2.text();
        if (role === "user") history.push('/user');
        else if (role === "admin") history.push('/admin');
        else if (role === "superadmin") history.push('/superadmin');
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            findRole();
            fetchallUsers();
        }
        else {
            history.push('/login');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '3%' }}>Users</h1>
            <div className="container">
                <div className='row'>
                    {users.map((user) => {
                        return <div key={user._id} className='col-md-4 my-2'>
                            <Usercard user={user} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Admin
