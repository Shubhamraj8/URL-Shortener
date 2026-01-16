const express = require("express")
const {connectToMongoDB} = require('./connect')
const app = express();
const urlRoute = require("./routes/url");
const PORT = 4400;
const URL = require ('./models/url');

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async(req,res) => {
    const shortId = req.params.id;
    const entry = await URL.findOneAndUpdate({

    }, { $push: {
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



