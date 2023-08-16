import React from 'react';

function Todoitem(props) {
    const { todo} = props;
    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{todo.title}</h5>
                    <p className="card-text">{todo.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Todoitem
