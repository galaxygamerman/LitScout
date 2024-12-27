const express = require('express')
const { URLSearchParams } = require('url')
const {bartSum, summarizeText} = require('./bartsum.js')
const {LSSum} = require('./gnlp.js')
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser=require('cookie-parser');
require('dotenv').config()
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const User=require('./models/user')
const {parseStringPromise} = require('xml2js')
const port = process.env.port
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    httpOnly: true
}))
mongoose.connect(process.env.mongoUri)
    .then(() => console.log('Connected to MongoDB cluster'))
    .catch(err => console.error('Could not connect to MongoDB cluster', err));
app.get('/',(req,res)=>{
return res.send("LitScout API is running.....")
})
app.post('/summarize',async(req,res)=>{
    const {text}=req.body
    const rs=await summarizeText(text)
    return res.status(200).json({summary: rs})
})
app.post('/scout',async(req,res)=>{
    try{
    var {key,max_res}=req.body
    if(!key) return res.status(400).json({error: "Please provide a search key"})
    key=key.split(" ").join("%20")
    if(!max_res) max_res=10
    const baseUrl=`${process.env.BHOST}/search?key=${key}&maxres=${max_res}`
    console.log(baseUrl)
    const rs= await fetch(baseUrl,{
        headers:{
           "Content-Type": "application/json"
        }
    })
    const rj = await rs.json();
    const flist=[]
    for(p of rj){
        if(!p.pdf_link) continue;
        const sumtext=await LSSum(p.short_sum)
        // const sumtext = await bartSum(p.pdf_link)
        console.log(sumtext)
        flist.push({
            id: flist.length+1,
            pdfUrl: p.pdf_link,
            source: p.source,
            summary: sumtext,
            date:new Date(p.published).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              }).replace(',', ''),
            title: p.title,
            author: p.author
        })
        // break;
    }
    return res.status(200).json({
        success: flist.length>0,
        res: flist
    })
}
catch(error){
    console.log(error)
    return res.status(500).json({error: error.stack})
}
}
)
const getpdf=(lst)=>{
    for( l of lst){
        if(l.$.type=="application/pdf")return l.$.href;
    }
    return undefined
}
app.get('/search',async(req,res)=>{
    try{
    const key=req.query.key
    const max_res=req.query.maxres || 20
    const rs= await getPapers(key,(max_res-8>2)? (max_res-8)/2: max_res)
    const plosP = await plosPapers(key,rs.length)
    const cp= await corePapers(key,rs.length+plosP.length,(max_res-8>2)? (max_res-8)/2: max_res)
    plist=[]
    if(rs[0])
    for(p of rs){
        plist.push({
            res_no: plist.length+1,
            link:p.id,
            pdf_link: getpdf(p.link),
            source: 'ARXIV',
            title:p.title,
            published: p.published,
            author: p.author.name,
            short_sum: p.summary,
        })
        // break;
    }
    return res.status(200).json([...plist,...plosP,...cp])
    }
    catch(err){
        console.log(err.stack)
        return res.status(500).json("Error"+err.toString())
    }
})
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

const getPapers=async(key,max=10)=>{
    const baseUrl = "http://export.arxiv.org/api/query?";
    const params = {
        search_query: key,
        start: 0,
        max_results: max,
        sortBy: "relevance",
        sortOrder: "descending"
    };
    const res = await fetch(baseUrl+ new URLSearchParams(params).toString())
    const restext= await res.text();
    const data = await parseStringPromise(restext, { explicitArray: false });
    const entries = data.feed.entry||[];
    return entries
}
const corePapers=async(key,st=0,limit)=>{
    key=key.split(" ").join("%20")
    const baseUrl = `https://api.core.ac.uk/v3/search/outputs/?q=${key}&limit=${limit}`;
    const res = await fetch(baseUrl,{
        headers: {
            'Authorization': `Bearer ${process.env.coreKey}`,
            "Content-Type": "application/json"
        },
        method: 'GET',
    })
    const rj= await res.json();
    const plist=[]
    if(!rj.results) return []
    for(p of rj.results){
        if(!(p.authors && p.authors[0])) continue;
        plist.push({
            res_no: plist.length+1+st,
            link:p.urls[0],
            source: "CORE",
            pdf_link: p.downloadUrl||p.links[0].url,
            title:p.title,
            published: p.publishedDate,
            author: p.authors[0].name||"",
            short_sum: p.abstract||p.fullText.substring(0,100),
        })
        // break;
    }
    return plist
}
const plosPapers=async(key,st=0)=>{
    key=key.split(" ").join("%20")
    const baseUrl = `https://api.plos.org/search?q=title:%22${key}%22%20AND%20body:%22${key}%22`;
    // console.log(baseUrl)
    const res = await fetch(baseUrl)
    const rj= await res.json();
    const plist=[]
    for(p of rj.response.docs){
        plist.push({
            res_no: st+plist.length+1,
            score:p.score,
            // pdf_link: p.link[1].$.href || "-",
            title:p.title_display,
            source: "PLOS",
            published: p.publication_date,
            author: (p.author_display)?p.author_display[0]:"",
            short_sum: p.abstract,
        })
    }
    return plist
}
const JWT_SECRET =process.env.JWT_SECRET;

app.post('/register',async(req,res)=>{
    try{
    const {username,password}=req.body
    let exuser=await User.findOne({username: username})
    if(exuser) return res.status(400).json({msg: `User ${username} already exists in the database. Please Login`})
    const hashedPass = await bcrypt.hash(password,10)
    exuser= new User({
        username: username,password:hashedPass
    })
    await exuser.save()
    const token = jwt.sign({username},JWT_SECRET,{expiresIn:"2h"})
    res.cookie('token', token, {
            httpOnly: true,
            expires: false,
            maxAge: 48*60*60*1000
          });
    return res.status(200).json({
        success: true,
        message: `User ${username} was added successfully`
    })
    }
    catch(error){
        res.status(500).json({message:"Error Occured: ",err:error.stack})
    }
})
app.post('/login',async(req,res)=>{
    try{
    const {username,password}=req.body
    const user=await User.findOne({username: username})
    if(!user) return res.status(400).json({success:false,message: `User ${username} doesn't exist in the database. Please Register`})
    const cpass= await bcrypt.compare(password,user.password)
    if(!cpass) return res.status(500).json({success:false, message:"Invalid credentials"})
        const token = jwt.sign({username},JWT_SECRET,{expiresIn:"2h"})
    res.cookie('token', token, {
            httpOnly: true,
            expires: false,
            maxAge: 48*60*60*1000
          });
    return res.status(200).json({
        success: true,
        message: `User ${username} has logged in`
    })
    }
    catch(error){

    }
})

const isLoggedIn=(req,res,next)=>{
    const token=req.cookies?.token
    // console.log(req.cookies?.token)
    if(!token) return res.status(404).json({success:false,message:"Error. Token missing"})
    try{
        const dec=jwt.verify(token,JWT_SECRET)
        req.user=dec
        next()
    }
    catch(error){console.log(error);return res.status(500).json({success: false,message: "access denied"})}
}

app.get('/prot',isLoggedIn,(req,res)=>{
    return res.send(`Welcome, ${req.user.username}This is a protected route`)
},)

// app.get('/testlog',async(req,res)=>{
//     const rs = await fetch('http://localhost:8080/login',{
//         method:"POST",
//         headers:{
//             "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body:JSON.stringify({username:'tet',password: 'tet' })
//     })
//     const rj= await rs.json();
//     console.log(rs);
//     res.json(rs)
// })

app.get('/logout',(req,res)=>{
    res.clearCookie('token', { httpOnly: true, path: '/' });
    return res.status(200).json({msg: "Logged out successfully"})
})

app.get('/check_reg',isLoggedIn,(req,res)=>{
return res.status(200).json({success:true,message: "Logged in",user:req.user})
})