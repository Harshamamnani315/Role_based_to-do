import React from 'react';
import { useContext } from 'react';
import context from '../../context/todos/context';

function EditableNoteItem(props) {
    const context1 = useContext(context);
    const { deleteTodo } = context1;
    const { todo, updateTodo } = props;

    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{todo.title}</h5>
                    <p className="card-text">{todo.description}</p>
                    <div className="icons d-flex justify-content-between">
                        <button className="btn btn-danger" onClick={() => { deleteTodo(todo._id) }}>Delete</button>
                        <button className="btn btn-dark" onClick={() => { updateTodo(todo) }}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditableNoteItem
