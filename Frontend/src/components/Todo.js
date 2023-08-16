import React, {useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/todos/context';
import TodoItem from './cards/Todoitem';

function Note() {
    const context1 = useContext(context);
    const { todos, getTodos} = context1;
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getTodos();
        }
        else{
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className='row my-3'>
                <h2>Your Todos</h2>
                <div className="container">
                    {todos.length===0 && 'No Todos to display'}
                </div>
                {todos.map((todo) => {
                    return <TodoItem key={todo._id} todo={todo}/>;
                })}
            </div>
        </>
    )
}

export default Note
