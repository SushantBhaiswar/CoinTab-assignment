const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const Router = require("./route")
const cors = require("cors")
const Cookiparser = require("cookie-parser")
// require('dotenv').config()
const DB = require("./configur/keys")

mongoose.set('strictQuery', true)
mongoose.connect(DB.DB)
    .then(() => {
        console.log("mongodb is connected")
    })
    .catch((err) => {
        console.log(err.message);
    })
app.use(Cookiparser())
app.use(cors())
app.use(express.json())
app.use("/", Router)
if (process.env.NODE_ENV == 'production') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, "./client/build")));

    app.get("*", function (_, res) {
        res.sendFile(
            path.join(__dirname, "./client/build/index.html"),
            function (err) {
                if (err) {
                    res.status(500).send(err)
                }
            }
        )
    })
}
app.listen(process.env.PORT || 3001, () => {
    console.log("Express app is running on port 3001");
})