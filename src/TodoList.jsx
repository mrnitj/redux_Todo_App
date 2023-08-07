import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from './store/userSlice'
import axios from 'axios';

const TodoList = () => {

  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const Username = useSelector((state) => state.user.userName)
  const todoValue = useSelector((state) => state.user.todo)
  const Token = localStorage.getItem('token')

  const [values , setValues] = useState('')
  

  const addHandler =() =>{
    
    const inputValue = inputRef.current.value
    dispatch(addTodo(inputValue))
    inputRef.current.value =''
  }
  

  // --------------Post Todo-----------


const newTodo = {
  todo: todoValue,
  username: Username
};

axios.post('https://todolist-api-nq54.onrender.com/users/todo', newTodo, {
  headers: {
    Authorization: `Bearer ${Token}`
  }
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error.response.data);
  });

  // --------READ ALL TODO-------------

  const userCredentials = {
    username: Username
  };
  
  
  axios.get('https://todolist-api-nq54.onrender.com/users/todo', {
    headers: {
      Authorization: `Bearer ${Token}`
    },
    data: userCredentials
  })
    .then(response => {
      console.log(response.data.data.todolist);
      setValues(response.data.data.todolist)
    })
    .catch(error => {
      console.error(error.response.data);
    });

  

  return (
    <div>
      <form action="" onSubmit={(e) => e.preventDefault()}>

          <input type="" placeholder='todos...' ref={inputRef} />
          <button onClick={addHandler}>add</button>

      </form>
        <ul>
        {values.map((item) => (
          <li key={item.id}>
            {item.title} 
            <button >Delete</button>
            
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList