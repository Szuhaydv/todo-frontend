import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const Register = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const loading = props.value.loading
  const setLoading = props.value.setLoading
  const handleRegister = () => {
    if (username && password && password2 && password == password2) {
      const registerCred = {
        username,
        password
      }
      axios
        .post(`https://todo-backend1-0rrs.onrender.com/register`, registerCred, { withCredentials: true, crossDomain: true, credentials: "include" })
            .then(() => {
              setLoading(false)
              navigate("/home")
            })
            .catch((err) => {
              console.log(err)
              setLoading(false)
            })
    } else if (username && password && password2) {
      alert("Password fields are not matching!")
    } else {
      alert("Fields incomplete!")
    }
  }
  return (
  <div className='background'>
    <form className="d-flex flex-column align-items-center shadow position-absolute top-50 start-50 translate-middle pt-5 px-4 bg-white" onSubmit={handleRegister}>
      <div className='d-flex'>
        <label>Username:</label>
        <input onChange={(e) => setUsername(e.target.value)} type="text" />
      </div>
      <div className='d-flex my-4'>
        <label>Password:</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password"/>
      </div>
      <div className='d-flex mb-3'>
        <label>Password (again):</label>
        <div><input onChange={(e) => setPassword2(e.target.value)} type="password"/></div>
      </div>
      <button className='btn mb-3' type='submit'>Register</button>
      <p>Already signed up? <Link to="/">Log in!</Link></p>
    </form>
  </div>
  )
}

export default Register