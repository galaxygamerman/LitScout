const express = require('express')
const { URLSearchParams } = require('url')
const {bartSum, summarizeText} = require('./bartsum.js')
const {LSSum} = require('./gnlp.js')
require('dotenv').config()
const {parseStringPromise} = require('xml2js')
const port = process.env.port
const app=express()
app.use(express.json())

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
    if(!max_res) max_res=50
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
        const sumtext=await bartSum(p.pdf_link)
        console.log(sumtext)
        flist.push({
            oglink: p.pdf_link,
            summary: sumtext,
            title: p.title,
            author: p.author
        })
        // break;
    }
    return res.status(200).json({
        // og:rj,
        res: flist
    })
}
catch(err){
    console.log(err)
    return res.status(500).json({error: err.stack})
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
    const max_res=req.query.maxres || 50
    const rs= await getPapers(key,(max_res-8>0)? (max_res-8)/2: max_res)
    const plosP = await plosPapers(key,rs.length)
    const cp= await corePapers(key,rs.length+plosP.length,(max_res-8>0)? (max_res-8)/2: max_res)
    plist=[]
    for(p of rs){
        plist.push({
            res_no: plist.length+1,
            link:p.id,
            pdf_link: getpdf(p.link),
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
    for(p of rj.results){
        if(!(p.authors && p.authors[0])) continue;
        plist.push({
            res_no: plist.length+1+st,
            link:p.urls[0],
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
            published: p.publication_date,
            author: p.author_display[0]||"_",
            short_sum: p.abstract,
        })
    }
    return plist
}