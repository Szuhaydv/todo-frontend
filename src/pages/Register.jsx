import axios from 'axios'
import { Link } from 'react-router-dom'


const Register = () => {
  return (
  <div className='background'>
    <div className="d-flex flex-column align-items-center shadow position-absolute top-50 start-50 translate-middle pt-5 px-4 bg-white">
      <div className='d-flex'>
        <label>Username:</label>
        <input type="text" />
      </div>
      <div className='d-flex my-4'>
        <label>Password:</label>
        <div><input type="password"/></div>
      </div>
      <div className='d-flex mb-3'>
        <label>Password (again):</label>
        <div><input type="password"/></div>
      </div>
      <button className='btn mb-3'>Register</button>
      <p>Already signed up? <Link to="/login">Log in!</Link></p>
    </div>
  </div>
  )
}

export default Register