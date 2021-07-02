const path = require("path");
const express = require("express");
const mainRouter = require("./routes/index");
const productRouter = require("./routes/products");
const ErrorHandler = require("./errors/errorHandler");
const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(productRouter);
app.use(mainRouter);

// global error handling for routes
app.use((req, res, next) => {
  return res.json({ message: "Page not found!" });
});

// error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof ErrorHandler) {
    res.status(error.status).json({
      error: {
        message: error.message,
        status: error.status
      },
    })
  } else {
    res.status(500).json({
        error: {
          message: error.message,
          status: 500
        },
      })
  }
});

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
