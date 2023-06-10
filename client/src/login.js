import React,{useState} from 'react'
import { loginuser } from './service/services'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const navigate=useNavigate()
    
    const handlesubmit=(e)=>{
        e.preventDefault()
        console.log(email,password)
        loginuser({email,password}).then(rst=>{
          console.log(rst.data)
          localStorage.setItem('authToken',rst.data.token)
          navigate('/')
        })
    }
    return (
    <div style={{
        color:'white',
        textAlign:'center',
        width:'500px',
        marginTop:'80px',
        marginLeft:'auto',
        marginRight:'auto',
        padding:"35px 0px",
    }}>
      <h1 style={{
        textDecoration:'underline',
        marginBottom:'50px'
      }}>Log in</h1>
      <form onSubmit={handlesubmit}>
        
        <label htmlFor='email'>Email</label><br/>
        <input 
        id='email' 
        type="email" 
        required
        onChange={(e)=>setemail(e.target.value)}
        value={email}/><br/>
        <label htmlFor='pswd'>Password</label><br/>
        <input 
        id='pswd' 
        type="password"
        required 
        onChange={(e)=>setpassword(e.target.value)}
        value={password}/><br/><br/>

        <input style={{background:'purple',color:'white'}} type="submit" value="Login"/>
      </form>
    </div>
  )
}

export default Login
