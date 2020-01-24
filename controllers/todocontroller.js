var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw err
    } else {
        console.log('MongoDb Connected');
        
    }
});

//schema

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);

var logSchema = new mongoose.Schema({
    name: String,
    email: String,
    pwd: String

});

var log = mongoose.model('log',logSchema);

// var item = Todo({ item: 'hi,good morning' }).save( (err) => {
//     if (err) {
//         throw err
//     } else {
//         console.log('stored');
        
//     }
    
// });

// var data = [ {item: 'get milk' },{item: 'study for test'},{item: 'write home work'} ]

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {

app.get('/todo',(req,res) => {

    Todo.find({},(err,data) => {
        if(err){
            throw err
        }else{
            res.render('todo',{todos: data});
        }
    });
    

});

app.get('/login',(req,res) => {    
    res.render('login')
});

app.post('/login',(req,res) =>{
    var login = log(req.body).save((err,data) => {
        if(err){
            throw err;
        }
        else{
            res.json(data);
        }
    });
});

app.post('/todo',urlencodedParser, (req,res) => {
    console.log(req.body);

    var newTodo = Todo(req.body).save((err,data) => {
        if(err){
            throw err;
        }
        else{
            res.json(data);
        }
    });
    
    // data.push(req.body);
    // res.json(data);

});

app.delete('/todo/:item',(req,res) => {
    Todo.deleteOne({item: req.params.item.replace(/-/g," ")}, (err,data) => {
        if(err){
            throw err;
        }else{
            res.json(data);
            console.log('Deleted ' + JSON.stringify(data));
            
        }
    })

});

};