import React from 'react';
import { useContext } from 'react';
import context from '../../context/todos/context';

function Admincard(props) {
    const context1 = useContext(context);
    const { deleteUser } = context1;
    const { user } = props;

    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.role}</p>
                <div className="icons d-flex justify-content-start">
                    <button className="btn btn-danger" onClick={() => {deleteUser(user._id)}}> Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Admincard
