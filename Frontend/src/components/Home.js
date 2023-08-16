import React from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';

function Home() {

  return (

    <div className="container my-3">
      <AddTodo/>
      <Todo/>
    </div>
  )
}

export default Home
