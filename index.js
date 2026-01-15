const express = require("express")
const {connectToMongoDB} = require('./connect')
const app = express();
const urlRoute = require("./routes/url");
const PORT = 4400;
connectToMongoDB('mongodb://127.0.0.1:27017/url_shortener')
.then(() => console.log("MongoDB Connected")
);
// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
app.use(express.json);