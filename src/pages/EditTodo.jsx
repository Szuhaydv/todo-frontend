import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditTodo = (props) => {
  const setLoading = props.value.setLoading
  const todos = props.value.todos
  const setTodos = props.value.setTodos
  const [name, setName] = useState("")
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  useEffect(() => {
    setLoading(true)
    axios
        .get(`https://todo-backend1-0rrs.onrender.com/todos/${id}`, {withCredentials: true, credentials: 'include'})
        .then((res) => {
          setName(res.data.name)
          setStatus(res.data.status)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
  }, [])
  const handleEdit = (e) => {
    e.preventDefault()
    if (name) {
      const editedTodo = {
        name,
        status
      }
      setLoading(true)
      axios
        .put(`https://todo-backend1-0rrs.onrender.com/todos/${id}`, editedTodo, { withCredentials: true, credentials: 'include' })
        .then(() => {
          let editedElement = todos.filter(item => item._id === id)
          let index = todos.indexOf(editedElement[0])
          todos.splice(index, 1, editedTodo)
          setTodos(todos)
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
    navigate("/")
  }
  const handleCancel = () => {
    navigate("/")
  }
  return (
    <div className='background'>
      <form className="d-flex flex-column align-items-center shadow position-absolute top-50 start-50 translate-middle p-3 pt-4 bg-white" onSubmit={handleEdit}>
        <div className='d-flex w-100 mb-3'>
          <label>
            To-Do:
          </label>
          <input type="text" autoFocus="autofocus" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='w-100 mb-3'>
          <label>
            Status:
          </label>
          <input className='mx-3 mt-1' type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} />
          {status ? "(completed)" : "(unfinished)"}
        </div>
        
        
        <div className="d-flex justify-content-evenly w-75">
          <button className='btn' type="submit">Edit</button>
          <button className='btn' onClick={handleCancel}>Cancel</button>
        </div>        
      </form>
    </div>
    
  )
}

export default EditTodo