require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
// const cookieParser = require('cookie-parser')
// app.use(cookieParser())
const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:3001','https://frontend-pi-self-1zzn0lclxw.vercel.app'],
    credentials : true,
}
app.use(express.json())
app.use(cors(corsOptions))

const connect = require('../src/dbConfig')
const PORT = process.env.PORT || 3000;

const allRoutes = require('./routes/index');
app.use("/api",allRoutes);
app.get('/',(req,res)=>{
    return res.send("Hello server started...")
})

app.listen(PORT, async()=>{
    try {
        await connect()
        console.log(`Server is running on ${PORT}`)
        console.log(`Connected to DB ${process.env.mongoDB_url}`)
    } catch (error) {
        console.log(`Connection Failed ${error.message}`)
    }
})
