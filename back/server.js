const fs = require('fs')
const express= require('express');
const cors =require('cors')
const app =express()
app.use(cors())
app.use(express.json())
const PORT=1234


const dir = '../backups'
const files = fs.readdirSync(dir)
console.log(files);
app.get('/',(req,res)=>{
    let p= JSON.stringify({files});

    res.send(p)
}
    
    )

app.listen(PORT,()=>{
    console.log(`runnig on ${PORT}`);
})