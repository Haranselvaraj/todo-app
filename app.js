var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var todocontroller = require('./controllers/todocontroller');

var app = express();

app.set('view engine','ejs');

app.use(express.static('./public'));
app.use(bodyParser.json())
app.use(morgan('dev'))

todocontroller(app);

app.listen(3000, ()=>{console.log('Server is running!');
});

