import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


const Login = (props) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const loading = props.value.loading
  const setLoading = props.value.setLoading
  const handleLogin = () => {
    if (username && password) {
      const loginCred = {
        username,
        password
      }
      axios
        .post(`https://todo-backend1-0rrs.onrender.com/login`, loginCred, { withCredentials: true })
            .then(() => {
              setLoading(false)
              navigate("/home")
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
      <p>Haven't registered yet? <Link to="/register">Register!</Link></p>
    </div>
  </div>
  )
}

export default Login


