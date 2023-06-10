import './App.css';
import {decodeToken} from 'react-jwt'
import {getitems} from './service/services';
import React,{useState,useEffect} from 'react';
import Form from './Form';
import ListItems from './ListItems';
import logo from './assets/todo.png';
import { useNavigate } from 'react-router-dom';

function App() {
  const [items,setitems]=useState([])
  const [input,setinput]=useState('')
  const [updatestate,setupdate]=useState(false)
  const [updateindex,setupdateindex]=useState()
  const navigate=useNavigate()

  useEffect(()=>{
    const token=localStorage.getItem('authToken')
    const decoded=decodeToken(token)
    if(decoded){
    getitems(setitems,token)
    }else{
      navigate('/login',{replace:true})
    }
  },[])
  
  // const itemsss=[
  //   {
  //     title:"Tomato-2kg",
  //     completeState:false
  //   },
  //   {
  //     title:"Potato-1kg",
  //     completeState:true
  //   },{
  //     title:"Carrot-1kg",
  //     completeState:false
  //   }
  // ]

  const listitems=items.map((val,pos)=>{
    return <ListItems title={val.title} status={val.completeState} input={input} setinput={setinput}
              updatestate={updatestate} setupdate={setupdate} setupdateindex={setupdateindex}
              items={items} setitems={setitems} index={val._id} key={val._id}/>
  });

  return (
      <div className="listCont">
        <div style={{alignItems:'center',display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <img style={{width:'30px'}} src={logo}/>
        <h4>To-Do</h4>
        </div>
        <Form updatestate={updatestate} setupdate={setupdate} items={items} setitems={setitems} 
        updateindex={updateindex}  input={input} setinput={setinput}/>
        {listitems}
      </div>
  );
}

export default App;
