const express = require("express")
const path = require("path")
const {connectToMongoDB} = require('./connect')
const app = express();
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const PORT = 4400;
const URL = require ('./models/url');

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async(req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId },
         { $push: {
            visitHistory: {
            timestamp: Date.now()
        },
    }
})
    res.redirect(entry.redirectURL);
})

connectToMongoDB('mongodb://127.0.0.1:27017/url_shortener')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));


app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));



