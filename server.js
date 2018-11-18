const express = require("express");
const app = express();
const path = require("path");

// app.get('/', (req, res) => res.send('Hello World!'))

// app.use('/', express.static('build'))

// app.use('/*', function(req, res){
//     res.redirect('/')
// })

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(2025, () => console.log("vault.electus.network on port 2025!"));
