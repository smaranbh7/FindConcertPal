
import { useDispatch, useSelector } from "react-redux"
import Signup from "./pages/Auth/Signup"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import MyConcerts from "./pages/MyConcerts"
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "./redux/auth/Action";
import Login from "./pages/Auth/Login";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector(store => store)

  useEffect (()=>{
    const jwt = localStorage.getItem('jwt')
    if(jwt){
      dispatch(getUser())
    }
  }, [dispatch])

  useEffect(()=>{
    if(auth.jwt && !auth.user){
      dispatch(getUser())
    }
  }, [auth.jwt, auth.user, dispatch])

  return (
    <>
     <Routes>
      {auth.user ?(
      <>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/my-concerts" element={<MyConcerts />}/>
      </>
    ):(
      <>
      <Route path="/" element={<Landing/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      </>
    )}
      
    </Routes>
    </>
   
    
    
  )
}

export default App