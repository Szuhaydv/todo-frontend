import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTodo from './pages/AddTodo.jsx'
import EditTodo from './pages/EditTodo.jsx'
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home value={{todos, setTodos, loading, setLoading}}/>} />
        <Route path="/add" element={<AddTodo value={{todos, setTodos, loading, setLoading}}/>} />
        <Route path="/:id" element={<EditTodo value={{todos, setTodos, loading, setLoading}}/>} />
      </Routes>
  );
}

export default App