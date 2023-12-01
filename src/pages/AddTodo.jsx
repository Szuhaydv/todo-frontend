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
        .post(`https://todo-backend1-0rrs.onrender.com/todos`, newTodo)
        .then(() => {
          setTodos(...todos, newTodo)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    } else {
      alert("Give a name to the todo!")
    }
    navigate("https://todo-frontend-q9k5.onrender.com")
  }
  const handleCancel = () => {
    navigate("https://todo-frontend-q9k5.onrender.com")
  }
  return (
    <div className='container2'>
      <form onSubmit={handleSubmit}>
        <label>
          To-Do:
          <input type="text" value={name} autoFocus="autofocus" onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          Status:
          <input type="checkbox" value={status} onChange={(e) => setStatus(e.target.checked)} />
          {status ? "(completed)" : "(unfinished)"}
        </label>
        <div className="buttons">
          <button type="submit">Add</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>        
      </form>
    </div>
  )
}

export default AddTodo