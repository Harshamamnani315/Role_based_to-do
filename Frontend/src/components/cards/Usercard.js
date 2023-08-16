import React from 'react';
import { useContext } from 'react';
import context from '../../context/todos/context';
import { Link } from "react-router-dom";

function Usercard(props) {
    const context1 = useContext(context);
    const { deleteUser } = context1;
    const { user } = props;

    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.role}</p>
                <div className="icons d-flex justify-content-between">
                    <button className="btn btn-danger" onClick={() => {
                        deleteUser(user._id);
                    }}>Delete</button>
                <Link to={`/todos/${user._id}`} className="btn btn-dark">View Todos</Link>
                </div>
            </div>
        </div>
    )
}

export default Usercard
