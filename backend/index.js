const express = require("express");
const { google } = require("@ai-sdk/google");
const { streamText, convertToModelMessages } = require("ai");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.post("/", async (req, res) => {
    try {
        const result = streamText({
            model: google("gemini-2.5-flash-lite"),
            messages: convertToModelMessages(req.body.messages),
            system: "ONLY STREAM BACK TEXT, NO MARKDOWN",
        });

        result.pipeUIMessageStreamToResponse(res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
