import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link, useNavigate } from 'react-router-dom'
  
  const Home = (props) => {
    const navigate = useNavigate()
    if (!document.cookie) {
      navigate("/login")
    }
    const loading = props.value.loading
    const setLoading = props.value.setLoading
    const todos = props.value.todos
    const setTodos = props.value.setTodos
    
    useEffect(() => {
      setLoading(true)
      axios
      .get('https://todo-backend1-0rrs.onrender.com/todos', { withCredentials: true, credentials: 'include' })
      .then((res) => {
        setTodos(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    }, [])
    const handleDelete = (id) => {
      setLoading(true)
          axios
            .delete(`https://todo-backend1-0rrs.onrender.com/todos/${id}`, { withCredentials: true })
            .then(() => {
              setTodos(todos.filter((todo) => todo._id != id))
              setLoading(false)
            })
            .catch((err) => {
              console.log(err)
              setLoading(false)
            })
    }
    const handleEdit = (id) => {
      navigate(`/${id}`)
    }

    const handleCheck = (todo) => {
      todo.status ? todo.status = false : todo.status = true
      const updatedTodo = {
        name: todo.name,
        status: todo.status
      }
      setLoading(true)
          axios
            .put(`https://todo-backend1-0rrs.onrender.com/todos/${todo._id}`, updatedTodo, { withCredentials: true })
            .then(() => {
              setLoading(false)
            })
            .catch((err) => {
              console.log(err)
              setLoading(false)
            })
    }
    return (
    <div className="background">
      <div className="d-flex flex-column align-items-center position-absolute top-50 start-50 translate-middle">
        <div className="firstRow d-flex mb-3 px-3 py-1">
            <h1 className='text-light'>My To-Do List</h1>
        </div>
        <div className="bg-white w-100 shadow p-2">
          <ul> 
            {loading ? <Spinner /> :
              todos && todos.length ? todos.map((todo, index) => {
                return(
                  <li key={index} className='position-relative w-100 d-flex'>
                    {todo.status ? <i onClick={() => handleCheck(todo)} className="bi bi-record-circle mx-2"></i> : <i onClick={() => handleCheck(todo)}className="bi bi-circle mx-2"></i>}
                    <p>
                      {todo.name}
                    </p>
                    <div className='position-absolute end-0 mx-2 d-flex'>
                        <i onClick={(e) => handleEdit(todo._id)} className="bi bi-pencil-square"></i>
                        <i onClick={(e) => handleDelete(todo._id)} className="bi bi-trash3-fill px-1"></i>
                    </div>
                  </li>
                )
              }) : <p> No todos found </p>
            }
          </ul>
          <button onClick={() => navigate("/add")} className='btn'>
            + New Task
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home