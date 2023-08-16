import { useState } from "react";
import context from "./context";

const AllRequests = (props) => {
    const host = 'http://localhost:5000';
    const InitialTodos = [];
    const [todos, setTodos] = useState(InitialTodos);
    const [users, setUsers] = useState([]);
    const [opentodos, setOpenTodos] = useState([]);

    // Get User Todos
    const getTodos = async () => {
        const response = await fetch(`${host}/api/todos/fetchusertodos`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setTodos(json);
    }
    // Add a Todo
    const addTodo = async (title, description) => {
        const response = await fetch(`${host}/api/todos/addtodo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description})
        });
        const todo = await response.json();
        setTodos(todos.concat(todo));
    }
    // Delete a Todo
    const deleteTodo = async (id) => {
        await fetch(`${host}/api/todos/deletetodo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const newTodos = opentodos.filter((note) => { return note._id !== id });
        setOpenTodos(newTodos);
    }

    // Edit a Todo
    const editTodo = async (id, title, description) => {
        await fetch(`${host}/api/todos/updatetodo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description})
        });
        let newTodos = JSON.parse(JSON.stringify(opentodos));
        for (let index = 0; index < newTodos.length; index++) {
            const element = newTodos[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                break;
            }

        }
        setOpenTodos(newTodos);
    }

    // Fetch All Users
    const fetchallUsers = async () => {
        const response = await fetch(`${host}/api/auth/fetchall`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setUsers(json);
    }

    // Delete User
    const deleteUser = async (id) => {
        await fetch(`${host}/api/auth/deleteuser/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const new_users = users.filter((user) => { return user._id !== id });
        setUsers(new_users);
    }

    // Open user Todos
    const openTodos = async (id) => {
        const response = await fetch(`${host}/api/todos/fetchtodosbyid/${id}`, {
             method: 'POST',
             headers: {
                 'auth-token': localStorage.getItem('token')
             },
         });
         const new_open_todos = await response.json();
         setOpenTodos(new_open_todos);
     }
    
    return (
        <context.Provider value={{ todos, users, opentodos, addTodo, deleteTodo, editTodo, getTodos, fetchallUsers, deleteUser, openTodos}}>
            {props.children}
        </context.Provider>
    )
}
export default AllRequests;