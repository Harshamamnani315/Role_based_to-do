import React, { useState } from 'react';
import { useContext } from 'react';
import context from '../context/todos/context';

function AddTodo() {
    const context1 = useContext(context);
    const { addTodo } = context1;
    const [todo, setTodo] = useState({ title: "", description: ""})

    const handleCLick = (e) => {
        e.preventDefault();
        addTodo(todo.title, todo.description);
        setTodo({ title: "", description: ""});
    }

    const onChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h2>Add a Todo</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={todo.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" aria-describedby="emailHelp" value={todo.description} onChange={onChange} />
                </div>
                <button disabled={todo.title.length <3 || todo.description.length <5} type="submit" className="btn btn-primary" onClick={handleCLick}>Add</button>
            </form>
        </>
    )
}

export default AddTodo
