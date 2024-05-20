import express from "express";
import dataJson from "./data.json";

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    next();
})

app.get("/", (req, res) => {
    try {
        if ( !dataJson || dataJson.length < 1 ) {
            // No data
            return res.status(404).send("No data available");
        } else {
            return res.status(200).json(dataJson);
        }
    } catch (error) {
        // Generic 500 error
        return res.status(500).json({ error });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});