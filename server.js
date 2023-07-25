const express = require('express');
const feedbackRouter = require('./public/assets/js/feedback');
const path = require('path');
const router = require('./notes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use('/feedback', feedbackRouter);
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use("/", router)
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
// app.get('/send', (req, res) => res.sendFile(path.join(__dirname, 'public/sendFile.html')));
// app.get('/routes', (req, res) => res.sendFile(path.join(__dirname, 'public/routes.html')));

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} 
    Press Ctrl + C to quit...`);
});

module.exports = app;
