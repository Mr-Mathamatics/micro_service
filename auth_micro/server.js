import express from "express";
import "dotenv/config"
import cors from "cors";
import router from "./routes/index.js";
const app = express();

const port = process.env.PORT || 5001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended:  false }));
app.use(cors());
app.use(router)

app.get('/', (req, res) =>{
    return res.json({message: "Hello"})
})

app.listen(port, () => console.log('listening on port ' + port))