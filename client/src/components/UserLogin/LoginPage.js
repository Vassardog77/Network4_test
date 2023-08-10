import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import CustomLink from "../../customComponents/CustomLink"
import Logo from "../../images/Logo_1.6.png"

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
    //console.log(email, password)
  }

  return (<div>
  <div className="logo">
      <img src={Logo} alt=""></img>
  </div>
  <div className="login_page">
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <button disabled={isLoading}>Log in</button>
    </form>
    {error && <div className="error">{error}</div>}
    <div className="user-auth">
      Don't have an account? 
      <CustomLink className="login_switch" to="/signup">Sign up</CustomLink>
    </div>
    </div>
    </div>)
}

export default LoginPage