import React, { useState, useEffect, useContext, useRef } from 'react';
import context from '../context/todos/context';
import AdvanceTodoItem from './cards/AdvanceTodoItem';
import { useParams } from 'react-router-dom';

function Usernotes(props) {
    const params = useParams();
    const context1 = useContext(context);
    const { opentodos, openTodos, editTodo } = context1;
    const [todo, setTodo] = useState({id:"", etitle: "", edescription: ""});

    useEffect(() => {
        openTodos(params.id);
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }

    const handleCLick = (e) => {
        e.preventDefault();
        editTodo(todo.id, todo.etitle, todo.edescription);
        refClose.current.click();
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateTodo = (currentTodo) => {
        ref.current.click();
        setTodo({id:currentTodo._id, etitle: currentTodo.title, edescription: currentTodo.description});
    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={todo.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" aria-describedby="emailHelp" value={todo.edescription} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={todo.etitle.length <3 || todo.edescription.length <5} onClick={handleCLick} type="button" className="btn btn-primary">Update Todo</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2 style={{textAlign:'center', marginBottom:'3%'}}>Todos</h2>
                <div className="container">
                    {opentodos.length===0 && 'No Todos to display'}
                </div>
                {opentodos.map((todo) => {
                    return <AdvanceTodoItem key={todo._id} todo={todo} updateTodo={updateTodo}/>;
                })}
            </div>
        </>
    )
}

export default Usernotes
