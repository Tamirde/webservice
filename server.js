
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
//this line is for makeing parts of the website dynamic and use it inside any page
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var Now = new Date().toString();
  var log = Now + req.method + req.url + req.ip;
  console.log(log);
fs.appendFile('server.txt', log + '\n', (err)=> {
  if (err) {
    var errorm = 'error';
    console.log('error writing to file');
    fs.appendFile('server.txt', errorm);
  }
});
  next();
});
// stop all pages until we add next();
//app.use((req, res, next) => {
//  res.render('maintance.hbs');
//});
  app.use(express.static(__dirname + '/public'));
//create a function and then call the function form any page ( footer.hbs)
hbs.registerHelper('getCurrentYear', () => {
return new Date().getFullYear()
});



app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pagetitle: "tamir",
    title: "32432432432",
  });
});
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pagetitle: "tamir",
    title: "32432432432",
  });
});

app.get('/github', (req, res) => {
  res.render('github.hbs', {
    pagetitle: "tamir",
    title: "32432432432",
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errormessage: 'this is error',
  });
});


app.listen(port, () => {
  console.log('server is up');
});
