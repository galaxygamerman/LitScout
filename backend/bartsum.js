require('dotenv').config()
const bartSum=async(text)=>{
    const res = await fetch(process.env.bartAPI,{
            method: 'POST',
            headers: { Authorization: `Bearer ${process.env.bartKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputs: text }),
    })
    const rs=await res.json()
    return rs[0].summary_text
}
module.exports={
    bartSum
}