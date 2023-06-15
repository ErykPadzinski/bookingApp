import "./navbar.css"
import { useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from "react";


export default function Navbar() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate()


  return (
    <div className="navbar">
 <div className="navContainer">
  <span onClick={() => navigate('/')} className="logo">roomFinder</span>
  {user ? user.username :  (<div className="navItems">
    <button onClick={() => navigate('/register')} className="navButton">Register</button>
    <button onClick={() => navigate('/login')} className="navButton">Login</button>

  </div>
    )}
 </div>
    </div>
  )
}
