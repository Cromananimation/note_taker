const express = require('express');
const bodyParser = require('body-parser')
const feedbackRouter = require('./public/assets/js/feedback');
const path = require('path');
const router = require('./notes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.static('public'))
app.use(bodyParser.urlencoded( {extended: false} ))
app.use(bodyParser.json())
app.use("/", router)


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} 
    Press Ctrl + C to quit...`);
});

module.exports = app;
