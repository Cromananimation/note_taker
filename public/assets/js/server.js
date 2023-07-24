const express = require('express')
const feedbackRouter = require('./feedback');
const app = express();
app.use('/feedback', feedbackRouter);
app.use(express.urlencoded({extended:false}));

app.get('/', (req,  res) => res.send('Navigate to /send or /routes'));
app.get('/send',(req,res) => res.sendFile(path.join(__dirname, 'public/sendFile.html')));
app.get('/routes',(req,res) => res.sendFile(path.join(__dirname, 'public/routes.html')));
app.listen(port, () => {
    console.log()('Example app listening at http://localhost:${port}');
});
module.exports = app;