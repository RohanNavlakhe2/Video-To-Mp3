const express = require('express')
const ytdl = require('ytdl-core')
const app = express()

const port = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.send('Welcome')
})

app.get('/videoInfo',async (req,res) => {
    // "https://www.youtube.com/watch?v=K-Ts-NFR62o"

    try {
        const url = req.query.videoUrl
        const info = await ytdl.getInfo(url)
        let downloadFormat = info.formats.filter(value => {
           return value.mimeType.includes("audio/mp4") && value.audioQuality === "AUDIO_QUALITY_MEDIUM"
        })
        let videoDetails = info.videoDetails
        let thumbnail = ""
        if(videoDetails.thumbnails.length > 0)
            thumbnail = videoDetails.thumbnails[0].url

        let obj = {
            "title":videoDetails.title,
            "thumbnail":thumbnail,
            "downloadUrl":downloadFormat[0].url
        }

        res.send(obj)
    }catch (e) {
        console.log(e)
        res.send(e.message)
    }
    //console.log("Info",info)
})

app.listen(port,() => {
    console.log(`Server Started at : http://localhost:3000/`)
})

/*Ytdl version giving error - "ytdl-core": "^4.11.0"*/

