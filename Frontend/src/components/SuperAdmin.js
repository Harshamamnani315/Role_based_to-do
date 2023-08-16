import React, { useEffect, useContext } from 'react';
import context from '../context/todos/context';
import Admincard from './cards/Admincard';
import Usercard from './cards/Usercard';
import { useHistory } from 'react-router-dom';

function SuperAdmin(props) {
  const context1 = useContext(context);
  const { fetchallUsers, users } = context1;
  const history = useHistory();

  const findRole = async () => {
    const response2 = await fetch('http://localhost:5000/api/auth/getrole', {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token')
      },
    });
    const role = await response2.text();
    if (role === "user") history.push('/student');
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
      <h1 style={{ textAlign: 'center', marginBottom: '3%' }}>Admins</h1>
      <div className="container">
        <div className='row'>
          {users.map((user) => {
            if (user.role === "admin") return <div key={user._id} className='col-md-4 my-2'>
              <Admincard user={user} />
            </div>
          })}
        </div>
      </div>

      <h1 style={{ textAlign: 'center', marginBottom: '3%', marginTop: '3%' }}>Users</h1>
      <div className="container">
        <div className='row'>
          {users.map((user) => {
            if (user.role === "user") return <div key={user._id} className='col-md-4 my-2'>
              <Usercard user={user} />
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default SuperAdmin
