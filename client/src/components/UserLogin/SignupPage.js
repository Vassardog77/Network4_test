import { useState } from "react";
import FileBase from 'react-file-base64';
import { useSignup } from "../../hooks/useSignup";
import CustomLink from "../../customComponents/CustomLink";
import Logo from "../../images/Logo_1.6.png";

const Signup = () => {
  const [Screen_name, setScreen_name] = useState('');
  const [Profile_pic, setProfile_pic] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Account_type, setAccount_type] = useState('');
  const {signup, error, isLoading} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(Screen_name, Profile_pic, Email, Password, Account_type);
  };

  return (
    <div>
      <div className="logo">
        <img src={Logo} alt=""></img>
      </div>
      <div className="login_page">
        <form className="signup" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>

          <label>Name:</label>
          <input 
            type="screen_name" 
            onChange={(e) => setScreen_name(e.target.value)} 
            value={Screen_name} 
          />

          <div>
            Profile Picture:
            <FileBase type='file' multiple={false} onDone={({base64}) => setProfile_pic(base64)}></FileBase>
          </div>

          <label>Email address:</label>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={Email} 
          />
          <label>Password:</label>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={Password} 
          />
          <div>
            <label>Account type:</label>
            <select 
              value={Account_type} 
              onChange={(e) => setAccount_type(e.target.value)} 
              required
            >
              <option value="">--Please choose an option--</option>
              <option value="student">Student</option>
              <option value="organization">Organization</option>
            </select>
          </div>
          <button disabled={isLoading}>Sign up</button>
          {error && <div className="error">{error}</div>}
        </form>
        <div className="user-auth">
          Have an account? 
          <CustomLink to="/login">Log in</CustomLink>
        </div>
      </div>
    </div>
  )
}

export default Signup;
