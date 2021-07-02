const path = require('path');
const express = require('express');
const  mainRouter = require('./routes/index');
const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(mainRouter)

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname) + '/index.html');
// })

// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'My Home Page'
//     })
// })

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'My About Page'
//     })
// })

// app.get('/about', (req, res) => {
//     res.sendFile(path.resolve(__dirname) + '/about.html');
// })

// app.get('/download', (req, res) => {
//     res.download(path.resolve(__dirname) + '/test.txt');
// })


app.listen(PORT, () => console.log(`Running on port: ${PORT}`));