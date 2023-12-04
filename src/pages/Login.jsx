import axios from 'axios'


const Login = () => {
  return (
  <div className='background'>
    <div className="d-flex flex-column align-items-center shadow position-absolute top-50 start-50 translate-middle pt-5 px-4 bg-white">
      <div className='d-flex'>
        <label>Username:</label>
        <input type="text" />
      </div>
      <div className='d-flex my-4'>
        <label>Password:</label>
        <div><input type="text"/></div>
      </div>
      <button className='btn mb-3'>Login</button>
      <p>Haven't registered yet? <a href="">Register!</a></p>
    </div>
  </div>
  )
}

export default Login


