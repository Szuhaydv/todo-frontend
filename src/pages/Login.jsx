import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const loading = props.value.loading
  const setLoading = props.value.setLoading
  const handleLogin = () => {
    if (username && password) {
      const loginCred = {
        username: username,
        password: password
      }
      axios
        .post(`https://todo-backend1-0rrs.onrender.com/login`, loginCred, { withCredentials: true, credentials: 'include' })
            .then(() => {
              setLoading(false)
              navigate("/")
            })
            .catch((err) => {
              console.log(err)
              setLoading(false)
            })
    } else {
      alert("Username or password field incomplete!")
    }
  }
  return (
  <div className='background'>
    <div className="d-flex flex-column align-items-center shadow position-absolute top-50 start-50 translate-middle pt-5 px-4 bg-white">
      <div className='d-flex'>
        <label>Username:</label>
        <input onChange={(e) => setUsername(e.target.value)} type="text" />
      </div>
      <div className='d-flex my-4'>
        <label>Password:</label>
        <div><input onChange={(e) => setPassword(e.target.value)} type="password"/></div>
      </div>
      <button onClick={handleLogin} className='btn mb-3'>Log in</button>
      <p>Haven't registered yet? <a href="/register">Register!</a></p>
    </div>
  </div>
  )
}

export default Login


