import React from 'react'
import './App.css'
import del from './assets/delete.svg'
import edit from './assets/update.svg'
import checked from './assets/checked.svg'
import unchecked from './assets/unchecked.svg'
import { getitems,updateitem,deleteitem } from './service/services'
import { decodeToken } from 'react-jwt'


const ListItems = ({title,status,index,input,setinput,setupdate,updatestate,setupdateindex,items,setitems}) => {
  
  let sts=status?'checkedtask':''
  const itemsts='itemCont '+sts;

  const changestatus=()=>{
    const token=localStorage.getItem('authToken')
    const decoded=decodeToken(token)
    if(decoded){
    updateitem(index,{completeState:!status,token})
    .then(result=>getitems(setitems))
    .catch(err=>console.log(err))
    }
  }

  const Updateitem=()=>{
      // updateitem(index,title)
      // .then(result=>)

      // items.filter((item,pos)=>{
      //   if(item._id===index){
          setinput(title)
          setupdate('true')
          setupdateindex(index)
        //   return true
        // }
        // return false
      }
  

  const removeitem=(id)=>{
    const token=localStorage.getItem('authToken')
    const decoded=decodeToken(token)
    if(decoded){
    deleteitem(id,token).then((result)=>{
      getitems(setitems)
    }).catch(err=>console.log(err))
    }
  }
  
  return (
    <div className={itemsts}>
      <h5>{title}</h5>
      <div className='features'>
      {status?
              <img onClick={changestatus} style={{
                    width:'20px'
              }} src={checked}/>
      :    
              <img onClick={changestatus} style={{
                    width:'20px'
              }} src={unchecked}/>
      }
        <img onClick={()=>Updateitem()} style={{
          width:'20px'
        }} src={edit}/>
        
        <img onClick={()=>removeitem(index)} style={{
          width:'18px'
        }} src={del}/>
      </div>
    </div>
  )
}

export default ListItems
