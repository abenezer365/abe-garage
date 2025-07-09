// modules
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// .env support
dotenv.config()

const PORT = process.env.PORT
// express app
const app = express()
// middlewares
app.use(cors())


// successful connection message on get request to root
app.get('/' , (req, res)=>{
    res.status(200).json({
        status : "OK",
        message : "Surver is up ✅"
    })
})

// start the server if the environment variable START_APP is set to true
if (process.env.START_APP === 'true') {
    app.listen(PORT, (err)=>{
        if (err) console.log(err)
            // log success message after server starts
        console.log(`Surver is up ✅ running on  http://localhost:${PORT}`)
    })
    // else log error message
} else {
    console.log("Missing envirometal variable START_APP")
}