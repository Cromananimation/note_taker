const express = require('express');
const feedbackRouter = require('./public/assets/js/feedback');
const path = require('path');
const router = require('./notes');

const app = express();
const port = 5500;

app.use('/feedback', feedbackRouter);
app.use(express.urlencoded({ extended: false }));
app.use("/", router)
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
// app.get('/send', (req, res) => res.sendFile(path.join(__dirname, 'public/sendFile.html')));
// app.get('/routes', (req, res) => res.sendFile(path.join(__dirname, 'public/routes.html')));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port} 
    Press Ctrl + C to quit...`);
});

module.exports = app;
