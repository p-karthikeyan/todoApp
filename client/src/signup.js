import React,{useState} from 'react';
import {useNavigate}  from 'react-router-dom';
import { registeruser } from './service/services';

const Signup = () => {
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [cpassword,setcpassword]=useState('')

    const navigate=useNavigate()
    
    const handlesubmit=(e)=>{
        e.preventDefault()
        const data={name,email,password,cpassword}
        registeruser(data).then(rst=>{
          console.log(rst)
          navigate('/login',{replace:true})
        })
        .catch(err=>console.log(err))
    }
    return (
    <div style={{
        color:'white',
        textAlign:'center',
        width:'600px',
        marginTop:'80px',
        marginLeft:'auto',
        marginRight:'auto',
        padding:'10px 0px'
    }}>
      <h1 style={{
        textDecoration:'underline',
        marginBottom:'50px'
      }}>Sign up</h1>
      <form onSubmit={handlesubmit}>
        <label htmlFor='name'>Name</label><br/>
        <input 
        id='name' 
        type="text" 
        required
        onChange={(e)=>setname(e.target.value)}
        value={name}/><br/>
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
        value={password}/><br/>
        <label htmlFor='cpswd'>Confirm Password</label><br/>
        <input 
        id='cpswd' 
        type="password"
        required 
        onChange={(e)=>setcpassword(e.target.value)}
        value={cpassword}/><br/><br/>

        <input style={{background:'purple',color:'white'}} type="submit" value="Signup"/>
      </form>
    </div>
  )
}

export default Signup
