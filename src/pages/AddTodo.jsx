import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddTodo = (props) => {
  const loading = props.value.loading
  const setLoading = props.value.setLoading
  const todos = props.value.todos
  const setTodos = props.value.setTodos
  const [name, setName] = useState("")
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name) {
      const newTodo = {
        name: name,
        status: status
      }
      setLoading(true)
      axios
        .post(`https://todo-backend1-0rrs.onrender.com/todos`, newTodo, { withCredentials: true })
        .then(() => {
          const newArray = [...todos, newTodo]
          setTodos(newArray)
          setLoading(false)
          navigate("/")
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    } else {
      alert("Give a name to the todo!")
    }   
  }
  const handleCancel = () => {
    navigate("/")
  }
  return (
    <div className='background'>
      <form className="d-flex flex-column align-items-center shadow position-absolute top-50 start-50 translate-middle p-3 pt-4 bg-white" onSubmit={handleSubmit}>
        <div className='d-flex w-100 mb-3'>
          <label>
            To-Do:
          </label>
            <input type="text" value={name} autoFocus="autofocus" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='w-100 mb-3'>
          <label>
            Status:
          </label>
            <input className='mx-3 mt-1' type="checkbox" value={status} onChange={(e) => setStatus(e.target.checked)} />
          {status ? "(completed)" : "(unfinished)"}
        </div>
        <div className='d-flex justify-content-evenly w-75'>
          <button className="btn" type="submit">Add</button>
          <button className="btn" onClick={handleCancel}>Cancel</button>
        </div>        
      </form>
    </div>
  )
}

export default AddTodo