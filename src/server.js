require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// Trust proxy for correct secure cookie handling behind platforms like Render
app.set('trust proxy', 1)
// Allow origins via env for flexibility in production
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001,https://frontend-pi-self-1zzn0lclxw.vercel.app').split(',');
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests without origin (like curl or same-origin)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
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
        console.log(`Connected to DB ${process.env.MONGODB_URL}`)
    } catch (error) {
        console.log(`Connection Failed ${error.message}`)
    }
})
