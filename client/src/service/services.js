import axios from 'axios';

const apiurl="https://todo-list.onrender.com"

export const getitems=(setitems,token)=>{
    axios.get(apiurl,{params:{tk:token}})
    .then(({data})=>{
        setitems(data)
    })
} 
export const additem=(item)=>{
    return axios.post(apiurl,item)
} 
export const updateitem=(id,item)=>{
    return axios.put(apiurl+'/'+id,item)
} 
export const deleteitem=(id)=>{
    return axios.delete(apiurl+'/'+id)
} 

export const registeruser=(data)=>{
    return axios.post(apiurl+'/signup',data)
}
export const loginuser=(data)=>{
    return axios.post(apiurl+'/login',data)
}