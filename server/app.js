const express=require('express')
const app=express()
const cors=require('cors')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const mongoose=require('mongoose')
const uri="mongodb+srv://karthik-2002:karthik2002@cluster.8oxgmsm.mongodb.net/mydb?retryWrites=true&w=majority"

const Item=require('./models/itemschema')
const User=require('./models/userschema')

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res=>{
    app.listen(8080,()=>console.log('server is listening on port 8080..'))
}).catch(err=>{
    console.log(err)
})
const secretkey="eiuhfuirh832urefj2o83yhooajljp1#*u0u(U)"
const generatetoken=id=>{
    return jwt.sign({_id:id},secretkey,{expiresIn:'1h'})
}
const authenticate=(usertoken)=>{
    return jwt.verify(usertoken,secretkey)
}

app.get('/',(req,res)=>{
    const token=req.query.tk
    const tk=authenticate(token)
    if(tk){
    Item.find().then(data=>res.send(data)).catch(err=>console.log(err))
    }else{
        res.status(500).send('error')
    }
})

app.post('/',(req,res)=>{
    const {title,tk}=req.body;
    const token=authenticate(tk)
    if(token){
    const data=new Item({title})
    console.log(data)
    data.save().then(result=>res.send(result)).catch(err=>console.log(err))
    }else{
        res.status(500).send('error')
    }
})

app.put('/:id',(req,res)=>{
    const id=req.params.id;
    const {toUpdate,tk}=req.body;
    const token=authenticate(tk)
    if(token){
        const data=new Item({title})
    Item.findByIdAndUpdate(id,toUpdate,{new:true})
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
    }else{
        res.status(500).send('error')
    }
})

app.delete('/:id',(req,res)=>{
    const id=req.params.id
    Item.findByIdAndDelete(id).then(result=>res.send(result)).catch(err=>console.log(err))
})

app.get('/users',(req,res)=>{
    User.find().then(result=>res.send(result)).catch(err=>console.log(err))
})

app.post('/signup',(req,res)=>{
    const {name,email,password}=req.body;
    User.findOne({email:email})
    .then(result=>{
        if(result){throw new Error("User already exist!!")}
        bcrypt.genSalt(10).then(salt=>bcrypt.hash(password,salt)).then(hashedpassword=>{
        const user=new User({name:name,email:email,password:hashedpassword})
        user.save().then(result=>{
            res.send({email})
        }).catch(err=>console.log(err))
    })
    }).catch(err=>{
        console.log(err)
        res.status(409).json({error:"User already exist!!"})
    })
})

app.post('/login',(req,res)=>{
    const {email,password}=req.body
    User.findOne({email}).then(user=>{
        if(!user){throw new Error("User doesn't exist!!")}
        bcrypt.compare(password,user.password)
        .then(match=>{
            if(!match){throw new Error("Incorrect Password!!")}
            const token=generatetoken(user._id)
            res.send({name:user.name,token})
        }).catch(err=>res.status(400).json({err:"Incorrect password!!"}))
        }).catch(err=>{res.json({err:"User does'nt exist!!"})})
})