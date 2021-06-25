const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/covid-api/', (req, res) => {
    res.sendFile(path.join(__dirname, '/covid-api.html'));
});

app.get('/scroll-stick/', (req, res) => {
    res.sendFile(path.join(__dirname, '/scroll-stick.html'));
});

app.listen(port, () => {
    console.log(`Local server started at port ${port}`)
});
