const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

connectDB(); 
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
// app.use("/api/users", require("./routes/users"));
// app.use("/api/posts", require("./routes/posts"));
// app.use("/api/comments", require("./routes/comments"));

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
