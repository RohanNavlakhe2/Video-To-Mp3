const express = require('express')
const ytdl = require('ytdl-core')
const app = express()

const port = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.send('Welcome')
})

app.get('/videoInfo',async (req,res) => {
    //https://www.youtube.com/watch?v=lHJp_3g2MAI

    try {
        const info = await ytdl.getInfo("https://www.youtube.com/watch?v=K-Ts-NFR62o")
        res.send(info)
    }catch (e) {
        console.log(e)
        res.send(e.message)
    }
    //console.log("Info",info)
})

app.listen(port,() => {
    console.log('Server Started')
})

