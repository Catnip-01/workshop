const express = require('express');
const {google} = require('@ai-sdk/google');
const {generateText} = require('ai');

require('dotenv').config();

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
    try{
        const response = await generateText({
            model: google("gemini-2.5-flash-lite"),
            prompt: "generate a greeting for my aunt",
        });

        res.send(response.text);
    } catch(err){
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
