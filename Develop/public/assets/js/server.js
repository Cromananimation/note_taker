const express = require('express')
const path = require('path')
const port = 3001
const app = express();
app.use(express.static('public'));
app.get('/', (req,  res) => res.send('Navigate to /send or /routes'));
app.get('/send',(req,res) => res.sendFile(path.join(__dirname, 'public/sendFile.html')));
app.get('/routes',(req,res) => res.sendFile('Navigate to /send or /routes'));
