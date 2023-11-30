import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

// const handleEdit = () => {

// }
  
  const Home = (props) => {
    const loading = props.value.loading
    const setLoading = props.value.setLoading
    const todos = props.value.todos
    const setTodos = props.value.setTodos
    const navigate = useNavigate()
    useEffect(() => {
      setLoading(true)
      axios
      .get('http://localhost:5555/todos')
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
            .delete(`http://localhost:5555/todos/${id}`)
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
            .put(`http://localhost:5555/todos/${todo._id}`, updatedTodo)
            .then(() => {
              setLoading(false)
            })
            .catch((err) => {
              console.log(err)
              setLoading(false)
            })
    }
    return (
    <div className="container">
      <div className="firstRow">
        <h1>My To-Do List</h1>
        <Link to={{pathname: '/add'}}>
          <CiSquarePlus size={64} />
        </Link>
      </div>
      <ul>
      {loading ? <Spinner /> :
        todos && todos.length ? todos.map((todo, index) => {
          return(
            <li key={index}>
              <div className="name">
                {todo.status ? <MdCheckBox onClick={() => handleCheck(todo)} className='icon' /> : <MdCheckBoxOutlineBlank onClick={() => handleCheck(todo)} className='icon' />}
                <span>
                  {todo.name}
                </span>
              </div>
              <FaRegEdit className='icon' onClick={(e) => handleEdit(todo._id)}/>
              <FaTrashCan className='icon' onClick={(e) => handleDelete(todo._id)}/>
          </li>
          ) 
        }) : <p> No todos found </p>
      }
      </ul>
      
    </div>
  )
}

export default Home