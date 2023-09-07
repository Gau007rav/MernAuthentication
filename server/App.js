let express = require("express");
let app = express();
let db = require("./db/connect")
let router = require("./routes/router")
let cors = require("cors")
let cookieParser = require("cookie-parser");
let port =  8009;
app.use(cors());
app.use(express.json())
app.use(cookieParser())

app.use(router);


app.listen(port,()=>{
    console.log("server started at "+port )
});