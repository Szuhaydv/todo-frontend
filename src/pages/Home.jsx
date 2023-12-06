import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link, useNavigate } from 'react-router-dom'
  
  const Home = (props) => {
    const navigate = useNavigate()
    const loading = props.value.loading
    const setLoading = props.value.setLoading
    const todos = props.value.todos
    const setTodos = props.value.setTodos
    
    useEffect(() => {
      setLoading(true)
      axios
      .get('https://todo-backend1-0rrs.onrender.com/todos', { withCredentials: true })
      .then((res) => {
        setTodos(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    })
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
            .put(`https://todo-backend1-0rrs.onrender.com/todos/${todo._id}`, updatedTodo, { withCredentials: true, credentials: 'include' })
            .then(() => {
              setLoading(false)
            })
            .catch((err) => {
              console.log(err)
              setLoading(false)
            })
    }
    const handleLogout = () => {
      setLoading(true)
      axios
        .get('https://todo-backend1-0rrs.onrender.com/logout', { withCredentials: true, credentials: 'include' })
        .then(() => {
          setLoading(false)
          navigate("/")
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }
    return (
    <div className="background position-relative">
      <div className='log-out position-absolute d-flex justify-content-center align-items-center m-2'>  
        <i class="bi h3 bi-box-arrow-right mx-2"></i>
        <p className='mx-2'>Log out</p>
      </div>
      <div className="d-flex flex-column align-items-center position-absolute top-50 start-50 translate-middle">
        <div className="firstRow d-flex justify-content-center align-items-center mb-3 px-3 py-1 position-relative">
          <h1 className='text-light'>My To-Do List</h1>
        </div>
        <div className="secondRow bg-white shadow-sm p-2 position-relative">
          <ul>
            {loading ? <Spinner /> :
              todos && todos.length ? todos.map((todo, index) => {
                return(
                  <li key={index} className='position-relative w-100 d-flex'>
                    {todo.status ? <i onClick={() => handleCheck(todo)} className="bi bi-record-circle m  x-2"></i> : <i onClick={() => handleCheck(todo)}className="bi bi-circle mx-2"></i>}
                    <div className='task-name'>
                      <p className='textp'>
                      {todo.name}
                    </p>
                    </div>
                    
                    <div className='position-absolute end-0 mx-2 d-flex'>
                        <i onClick={(e) => handleEdit(todo._id)} className="bi bi-pencil-square"></i>
                        <i onClick={(e) => handleDelete(todo._id)} className="bi bi-trash3-fill px-1"></i>
                    </div>
                  </li>
                )
              }) : <div className='d-flex justify-content-center'><p> No todos found </p></div>
            }
          </ul>
          <div className='w-100 d-flex justify-content-center'>
            <button className="task-button btn shadow" onClick={() => navigate("/add")}>
              + New Task
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home