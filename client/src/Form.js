import React from 'react'
import {getitems,updateitem,additem,deleteitem} from './service/services';
import './App.css' 

const Form = ({items,setitems,updatestate,setupdate,updateindex,input,setinput}) => {
  
  const add=(event)=>{
      event.preventDefault();
      const token=localStorage.getItem('authToken')
      if(updatestate){
        updateitem(updateindex,{title:input,tk:token})
        .then(result=>getitems(setitems,token))
        .catch(err=>console.log(err))
        }
        else{
        additem({title:input,tk:token})
        .then((result)=>{
          console.log(result)
          setitems([...items,result])
        }).catch(err=>console.log(err))
        
        }
        setinput('')
        setupdate(false)
  }

  const inputchange=(event)=>{
      setinput(event.target.value)
  }
  return (
    <div className='inputCont'>
        <form onSubmit={add}>
        <input name="item" type='text' onChange={inputchange} value={input} required/>
        {updatestate?<button type='submit'>Update</button>:
        <button type='submit'>Add</button>}
        </form>
    </div>
  )
}

export default Form
