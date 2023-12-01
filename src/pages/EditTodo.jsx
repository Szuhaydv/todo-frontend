import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditTodo = (props) => {
  const setLoading = props.value.setLoading
  const [name, setName] = useState("")
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  useEffect(() => {
    setLoading(true)
    axios
        .get(`https://todo-backend1-0rrs.onrender.com/todos/${id}`)
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
        .put(`https://todo-backend1-0rrs.onrender.com/todos/${id}`, editedTodo)
        .then(() => {
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
    navigate("https://todo-backend1-0rrs.onrender.com")
  }
  const handleCancel = () => {
    navigate("https://todo-backend1-0rrs.onrender.com")
  }
  return (
    <div className='container2'>
      <form onSubmit={handleEdit}>
        <label>
          To-Do:
          <input type="text" autoFocus="autofocus" value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          Status:
          <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} />
          {status ? "(completed)" : "(unfinished)"}
        </label>
        <div className="buttons">
          <button type="submit">Edit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>        
      </form>
    </div>
  )
}

export default EditTodo